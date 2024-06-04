from motor.motor_asyncio    import AsyncIOMotorClient
from pymongo.errors         import OperationFailure

# Declaration of my environements variables:
# TODO : Move it into a .env file

MONGO_DB_URL = "mongodb+srv://Solymnos:1ncubus0Wmongodb@sly-api-db.rdzdzn5.mongodb.net/slydle?retryWrites=true&w=majority"

# Declaration of my differents variables :
#   .users = MongoDB users database

users = None

# Function call at init : Create link to mongoDB database

async def connexion_to_database():
    global users
    try :
        client = AsyncIOMotorClient(MONGO_DB_URL)
        database = client.get_database("slydle")
        users = database.get_collection("users")
    except OperationFailure as e:
        print(f"Erreur lors de la connexion à MongoDB: {e}")
    except Exception as e:
        print(f"Une erreur innatendue : {str(e)}")

def get_users():
    return users
    
async def get_user_rank(user_id):
    users = get_users()
    users_cursor = users.find().sort("score", -1)
    users_collection = await users_cursor.to_list(None)
    for index, user in enumerate(users_collection):
        if str(user["_id"]) == str(user_id):
            return index + 1
    return 0