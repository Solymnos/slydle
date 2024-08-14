import { apiGetRanking, apiPostScoreUpdate, apiGetChoices, apiGetAnswer} from "../services/API";

export const getRanking = async () =>
{
    try
    {
        const response = await apiGetRanking();
        return { success : true, error : null, response : response }
    } catch (error)
    {
        return { success : false, error : error.response.data.detail };
    }
}

export const updateUserScore = async ({ score, id , token}) =>
{
    try
    {
        const response = await apiPostScoreUpdate({score : score , id : id , token : token});
        return { success : true , error : null , response : response }
    } catch (error)
    {

        return ({success : false, error : error.response.data.detail });
    }
}

export const getChoices = async() =>
{
    try 
    {
        const response = await apiGetChoices();
        return { success : true, error : null, response : response }
    } catch (error)
    {

        return ({ success : false, error : error.response.data.detail })
    }
}

export const getAnswer = async () =>
{
    try
    {
        const response = await apiGetAnswer();
        return { success : true, error : null, response : response }
    } catch (error)
    {
        return ({ success : false, error : error.response.data.detail })
    }
}