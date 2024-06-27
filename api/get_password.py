from passlib.context    import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash() :
    has = pwd_context.hash("abiou0000")
    print(has)

get_password_hash()