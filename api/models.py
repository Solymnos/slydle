from pydantic   import BaseModel, BeforeValidator, Field, ConfigDict
from typing     import Annotated, Optional

PyObjectId = Annotated[str, BeforeValidator(str)]

class UserModel(BaseModel):
    id : Optional[PyObjectId] = Field(alias="_id", default=None)
    username : str = Field(...)
    email : str = Field(...)
    score : int = Field(...)
    hashed_password : str = Field(...)
    did_it_today : bool = Field(...)
    streak : int = Field(...)
    model_config =  ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True
    )