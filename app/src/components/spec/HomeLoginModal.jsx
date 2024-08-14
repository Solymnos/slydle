import React , { useState } from 'react'
import styled from 'styled-components';
import { useDispatch , useSelector } from 'react-redux';
import { setDailyScore, setIsAuthenticated } from '../../context/UserSlice';
import { userLogin } from '../../hooks/Authentication';

import { getScore } from '../../utils/GameLogic';
import { updateUserScore } from '../../hooks/Data';

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    min-width: 20rem;
    margin: 0.5rem;
`

const InputTitle = styled.h2`
    text-align: left;
    font-size: 14px;
    color: white;
`

const Input = styled.input`
    font-size: 14px;
    border-radius: 8px;
    font-weight: 600;
    padding: 0.25rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`

const ValidationButton = styled.div`
    background-color: white;
    color : black;
    padding: 0.5rem;
    font-size: 18px;
    font-weight: bold;
    align-self: center;
    border-radius: 8px;
    margin-top: 1rem;
    border : white solid 2px;
    cursor: pointer;
    &:hover {
        border : #ffdd33 solid 2px;
    }
`

const SubButton = styled.text`
    font: 10px;
    color: white;
    align-self: center;
    margin-top: 0.5rem;
`

const Link = styled.span`
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
        color : #ffdd33;
    }
`

const ErrorText = styled.text`
    font-size: 12px;
    color: red;
`

function HomeLoginModal({closeModal, setFormType}) 
{
    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ error , setError ] = useState('');
    
    const dispatch = useDispatch();
    
    const user = useSelector(state => state.user);
    
    const login = async() =>
    {
        if (username === '' || password === '')
        {
            setError('Merci de remplir tous les champs')
        } else {
            setError('')
            const { success , error , response } = await userLogin({ username : username, email : username , password : password });
            if (!success)
            {
                setError(error);
            } else {
                if (user.didItToday)
                {
                    let score = getScore({ tries : user.dailyTries , streak : response.data.user.streak });
                    const { success :  n_success, error : n_error, response : n_response } = await updateUserScore({ score :  score, id : response.data.user._id.$oid, token : response.data.access_token})
                    if (n_success) {
                        dispatch(setIsAuthenticated({ isAuthenticated  : true, user : n_response.data.user, token : response.data.access_token, rank : n_response.data.rank }))
                        dispatch(setDailyScore({ score : score }));
                    } else {
                        dispatch(setIsAuthenticated({ isAuthenticated : false, user : null, token : null, rank : null}))
                    }
                } else {
                    dispatch(setIsAuthenticated({ isAuthenticated : true, user : response.data.user, token : response.data.access_token, rank : response.data.rank }));
                }
                closeModal();
            }
        }
    }
    
    return (
        <ModalContainer>
            <ErrorText>{error}</ErrorText>
            <InputTitle>Nom d'utilisateur ou adresse mail</InputTitle>
            <Input type='text' value={username} placeholder={'Nom d\'utilisateur/Adresse mail'} onChange={(e) => setUsername(e.target.value)}/>
            <InputTitle>Mot de passe</InputTitle>
            <Input type='password' value={password} placeholder={'Mot de passe'} onChange={(e) => setPassword(e.target.value)}/>
            <ValidationButton onClick={async() => await login()}>Se connecter</ValidationButton>
            <SubButton>Pas de compte ? <Link onClick={() => setFormType('REGISTER')}>S'inscrire</Link></SubButton>
        </ModalContainer>
    )
}

export default HomeLoginModal;