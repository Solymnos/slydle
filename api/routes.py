from fastapi                            import APIRouter, HTTPException, status, Depends
from fastapi.responses                  import JSONResponse
from fastapi.security                   import OAuth2PasswordBearer
from database                           import get_users, get_user_rank
from authentication                     import get_password_hash, create_access_token, verify_password, verify_token
from datetime                           import timedelta
from bson                               import json_util
from pydantic                           import BaseModel
from bson                               import ObjectId
from apscheduler.schedulers.background  import BackgroundScheduler
import asyncio
import json
import os
import random

#from bson               import ObjectId
#import pydantic
#
#pydantic.json.ENCODERS_BY_TYPE[ObjectId]=str

# Declaration of my environements variables:
# TODO : Move it into a .env file

ACCESS_TOKEN_EXPIRE_MINUTES = 20160

with open("data_slydle_update.json", "r") as file :
    jsondata = json.load(file)

daily_answer = random.choice(jsondata)

async def daily_users_update():
    users = get_users()
    async for user in users.find() :
        print(user.get("did_it_today"))
        if user.get("did_it_today") == True :
            new_values = {"$set" : { "did_it_today" : False }}
        else : 
            new_values = {"$set" : { "streak" : 0 }}
        await users.update_one({"_id" : user["_id"]}, new_values) 

def daily_task():
    global daily_answer
    daily_answer = random.choice(jsondata)
    asyncio.run(daily_users_update())
    print("update")

scheduler = BackgroundScheduler()
scheduler.add_job(daily_task, 'cron', hour=22, minute=0)
scheduler.start()

oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

router = APIRouter()

class UserRegisterRequest(BaseModel):
    username : str
    email : str
    password : str

@router.post("/user/register")
async def user_register(request : UserRegisterRequest):
    users = get_users()
    existing_user = await users.find_one({"username" : request.username})
    if existing_user :
        raise HTTPException(status_code=400, detail="Nom d'utilisateur déjà utilisé")
    existing_user = await users.find_one({"email" : request.email})
    if existing_user :
        raise HTTPException(status_code=400, detail="Email déjà utilisé")
    
    hashed_password = get_password_hash(request.password)
    
    new_user = {
        "username" : request.username,
        "email" : request.email,
        "hashed_password" : hashed_password,
        "score" : 0,
        "did_it_today" : False,
        "streak" : 0
    }
    saved_user = await users.insert_one(new_user)
    new_user = await users.find_one({"_id" : saved_user.inserted_id}, {"hashed_password": 0})
    new_user = json.loads(json_util.dumps(new_user));
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": request.username}, expires_delta=access_token_expires)
    rank = await get_user_rank(saved_user.inserted_id)
    return {"user": new_user, "access_token": access_token, "rank" : rank}
    
class UserLoginRequest(BaseModel):
    username : str
    email : str
    password : str

@router.post("/user/login")
async def user_login(request : UserLoginRequest):
    users = get_users()
    user = await users.find_one({"username" : request.username})
    if not user :
        user = await users.find_one({ "email" : request.email })
    if not user : 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Nom d'utilisateur, email, ou mot de passe incorrect")
    hashed_password = user.get("hashed_password")
    if not verify_password(request.password, hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Nom d'utilisateur, email, ou mot de passe incorrect")
    user_to_return = await users.find_one({"_id" : user.get("_id")}, {"hashed_password" : 0})
    user_to_return = json.loads(json_util.dumps(user_to_return))
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": request.username}, expires_delta=access_token_expires)
    _id = user.get("_id")
    rank = await get_user_rank(_id)
    return { "user": user_to_return, "access_token" : access_token, "rank" : rank }
    
class DataRankingResponse(BaseModel):
    id : str
    username : str
    score : int
    streak : int
    
    class Config:
        json_encoders = {ObjectId: str}
        allow_population_by_field_name = True
    
@router.get("/data/ranking/")
async def get_ranking(): 
    users = get_users()
    users_cursor = users.find().sort("score", -1)
    users_collection = await users_cursor.to_list(None)
    users_list = []
    for user in users_collection : 
        users_list.append(DataRankingResponse(
            id=str(user["_id"]),
            username=user["username"],
            score=user["score"],
            streak=user["streak"]
        ))
    return { "users_ranking" : users_list }
    
@router.get("/data/my_rank/{id}")
async def get_my_rank(id : str, token: str = Depends(oauth_2_scheme)):
    token_validity = verify_token(token)
    if token_validity == False :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Crédits non valides", headers={"WWW-Authenticate" : "Bearer"})
    rank = get_user_rank(id)
    if  rank != 0:
        return { "rank" : rank }
    raise HTTPException(status_code=404, detail="Utilisateur inconnu")
    
class UserUpdateScore(BaseModel):
    id : str
    score_update : int

@router.post("/data/update_score")
async def update_score(request: UserUpdateScore, token: str = Depends(oauth_2_scheme)):
    token_validity = verify_token(token)
    if token_validity == False :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Crédits non valides", headers={"WWW-Authenticate" : "Bearer"})   
    users = get_users()
    user = await users.find_one({"_id" : ObjectId(request.id)})
    did_it_today = user.get("did_it_today", False)
    if did_it_today :
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Update already done") 
    update_fields = {"score" : user["score"] + request.score_update}
    update_fields["streak"] = user["streak"] + 1
    update_fields["did_it_today"] = True    
    await users.update_one({"_id" : ObjectId(request.id)}, {"$set": update_fields})
    user_to_return = await users.find_one({"_id" : user.get("_id")}, {"hashed_password" : 0})
    user_to_return = json.loads(json_util.dumps(user_to_return))
    _id = user.get("_id")
    rank = await get_user_rank(_id)
    return ({"user" : user_to_return ,  "rank" : rank})

@router.get("/data/choices")
async def get_choices():
    try :
        with open("data_slydle_update.json","r", encoding="utf-8") as file:
            data = json.load(file)
        return data
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Fichier non trouvé")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Erreur lors de la lecture du JSON.")
        
@router.get("/data/answer")
async def get_answer():
    return (daily_answer)