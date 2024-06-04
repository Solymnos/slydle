from fastapi                    import FastAPI
from contextlib                 import asynccontextmanager
from routes                     import router
from database                   import connexion_to_database
from fastapi.middleware.cors    import CORSMiddleware

# Creation of lifespan to execute action in initialisation, thoses differents tasks would be :
#   .Start:
#       .Connexion to extern database (MongoDB)
        

@asynccontextmanager
async def lifespan(app : FastAPI):
    await connexion_to_database()
    yield
    print('lifespan end')

app = FastAPI(lifespan=lifespan, docs_url=None)

# CORS Settings

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


app.include_router(router)