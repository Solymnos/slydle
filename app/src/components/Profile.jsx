import React , { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsAuthenticated } from '../store/UserSlice';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    background-color: #282828;
    border: #ffffff 1px solid;
    border-radius: 18px;
    min-width: 26rem;
    padding: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Auth = styled.div`
    display: flex;
    flex-direction: row;
    width: 70%;
    justify-content: center;
    text-align: center;
    align-items: center;
    border: #ffffff 1px solid;
    border-radius: 8px;
    background-color: #181818;
    padding: 0.5rem;
`

const Message = styled.div`
    color: white;
    font-size: 16px;
`

const Link = styled.span`
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
        color : #ffdd33;
    }
`

const GoToRank = styled.div`
    width: 25%;
    border: #ffffff 1px solid;
    border-radius: 8px;
    background-color: #181818;
    color: white;
    font-weight: bold;
    font-size: 18px;
    text-align: center;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    cursor: pointer;
    
    &:hover {
        border-color: #ffdd33;
    }
`

function Profile({ openModal , setFormType})
{
    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);

    const dispatch = useDispatch();

    const openLogin = () =>
    {
        setFormType('LOGIN');
        openModal();
    }

    const openRegister = () =>
    {
        setFormType('REGISTER');
        openModal();
    }
    
    const handleLogin = () =>
    {
        console.log('username : ' + username);
        console.log('password : ' + password);
        
        let userCredential = 
        {
            username,
            password
        }
        dispatch(setIsAuthenticated({ isAuthenticated : true, user : userCredential }));
    }
    
    console.log (isAuthenticated)

    return (
        <ProfileContainer>
            <Auth>
            {
                isAuthenticated ? 
                (
                    <Message>Vous êtes connectés</Message>
                ) : (
                    <Message>Pour participer au classement <Link onClick={() => openLogin()}>connectez-vous</Link> ou <Link onClick={() => openRegister()}>inscrivez-vous</Link> !</Message>
                )
            }
            </Auth>
            <GoToRank>Voir le classement</GoToRank>
        </ProfileContainer>
    )
}

export default Profile; 