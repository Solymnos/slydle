import axios from 'axios';

// TODO : Mettre le SRV_URL dans une variable d'environnement

const SRV_URL='http://localhost:8000';

const api_register = async(username, email, password) =>
{
    let data = 
    {
        username : username,
        email : email,
        password : password,
    }
    console.log(JSON.stringify(data))
    let response = await axios.post(SRV_URL + '/user/register', JSON.stringify(data),
        {
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        });
    return response;
}

export default api_register;