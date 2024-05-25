from fastapi import Depends, FastAPI, HTTPException, status, Header, Body
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, BeforeValidator, Field, ConfigDict
from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Annotated, Optional, List
from bson import ObjectId
import motor.motor_asyncio
from pymongo.errors import OperationFailure
from contextlib import asynccontextmanager

SECRET_KEY = "d50544a79e53979a882969858a05c20343e4f17531d7b4e48bbc42e14ca28bf6"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 20160
MONGO_DB_URL = "mongodb+srv://Solymnos:1ncubus0Wmongodb@sly-api-db.rdzdzn5.mongodb.net/slydle"

#client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DB_URL)
#database = client.get_database("slydle")
#users = database.get_collection("users")

PyObjectId = Annotated[str, BeforeValidator(str)]

async def connexion_database():
    print("Connexion test start")
    try :
        client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DB_URL)
        database = client.get_database("slydle")
        users = database.get_collection("users")
        result = await(users.insert_one({"test" : "test"}))
        if result.inserted_id:
            print("Connexion réussie")
        else:
            print("Connexion échouée")
    except OperationFailure as e:
        print("Erreur lors de la connexion à MongoDB : {e}")

class UserModel(BaseModel):
    id : Optional[PyObjectId] = Field(alias="_id", default=None)
    username : str = Field(...)
    email : str = Field(...)
    score : int = Field(...)
    hashed_password : str = Field(...)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )

class UpdatedUserModel(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    score: Optional[int] = None
    hashed_password: Optional[str] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str}
    )

class StudentCollection(BaseModel):
    users : List[UserModel]

class Token(BaseModel):
    access_token : str
    token_type: str

class TokenData(BaseModel):
    username: str or None = None
    
class User(BaseModel):
    username: str
    email: str or None = None
    disabled: bool or None = None

class UserInDB(User):
    hashed_password: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth_2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user(db, username: str):
    if username in db:
        user_data = db[username]
        return UserInDB(**user_data)
        
def authenticate_user(db, username: str, password: str):
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

def create_access_token(data: dict, expires_delta: timedelta or None = None): 
    to_encode = data.copy()
    if (expires_delta):
        expire = datetime.now(datetime.UTC) + expires_delta
    else:
        expire = datetime.now(datetime.UTC) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth_2_scheme)):
    credential_exception = HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentails", headers={"WWW-Authenticate": "Bearer"})
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credential_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credential_exception
    user = get_user(db, username=token_data.username)
    if user is None:
        raise credential_exception
    return user

#MINE
#REGISTER

@app.post("/users/register")
async def user_register(username: str, email: str, password: str):  
    existing_user = await users.find_one({"username" : username})
    if existing_user :
        raise HTTPException(status_code=400, detail="Nom d'utilisateur déjà utilisé")
    existing_user = await users.find_one({"email" : email})
    if existing_user :
        raise HTTPException(status_code=400, detail="Adresse mail déjà utilisée")

    print("Utilisateur introuvable")

    hashed_password = get_password_hash(password)
    
    new_user = {
        "username" : username,
        "email" : email,
        "hashed_password" : hashed_password,
        "score" : 0
    }
    new_user_insert = await users.insert_one(new_user)
    new_user = await users.find_one({"_id": new_user_insert.inserted_id}, {"hashed_password" : 0})
    
    print("New user : " , new_user);
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": username}, expires_delta= access_token_expires)
    
    return {"user" : new_user, "access_token" : access_token }

#LOGIN

@app.post("/users/login", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password", headers={"WWW-Authenticate": "Bearer"})
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta= access_token_expires)
    return {"access_token" : access_token, "token_type" : "bearer"}



@app.get("/users/me", response_model=User)
async def read_users_me(token: str = Header(...)):
    current_user = await get_current_user(token)
    return current_user