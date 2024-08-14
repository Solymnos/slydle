import axios from 'axios';

// TODO : Metter le lien du serveur en conf 

const SRV_URL='https://slydle-api.fr';
//const SRV_URL = 'http://localhost:8000';

export const apiRegister = async({username, email, password}) =>
{
    let data = 
    {
        username : username,
        email : email,
        password : password,
    }
    let response = await axios.post(SRV_URL + '/user/register', JSON.stringify(data),
    {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    });
    return response;
}

export const apiLogin = async({ username , email , password }) =>
{
    let data =
    {
        username : username,
        email : email,
        password : password
    }
    let response = await axios.post(SRV_URL + '/user/login', JSON.stringify(data),
    {
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
        }
    });
    return response;
}

export const apiGetRanking = async () =>
{
    let response = await axios.get(SRV_URL + '/data/ranking');
    return response;
}

export const apiPostScoreUpdate = async ({ score , id , token }) =>
{
    let data = 
    {
        id : id,
        score_update : score
    }
    let response = await axios.post(SRV_URL + '/data/update_score', JSON.stringify(data), { 
        headers : { 
            'Authorization' : `Bearer ${token}`,
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
            }})
    return response;
}

export const apiGetChoices = async() =>
{
    let response = await axios.get(SRV_URL + '/data/choices');
    return response;
}

export const apiGetAnswer = async() =>
{
    let response = await axios.get(SRV_URL + '/data/answer');
    return response;
}