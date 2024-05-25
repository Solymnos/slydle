import React , { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuthenticated } from '../../context/UserSlice';
import styled from 'styled-components';

const ProfileContainer = styled.div`
    background-color: #282828;
    border: #ffffff 1px solid;
    border-radius: 18px;
    min-width: 28rem;
    max-width: 32rem;
    padding: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Auth = styled.div`
    display: flex;
    flex-direction: column;
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
    color: white;
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
    padding:0.5rem;
    cursor: pointer;
    
    &:hover {
        border-color: #ffdd33;
    }
`

const Space = styled.div`
    width: 5%;
`

const Pseudo = styled.div`
    flex:2;
    color: white;
    font-weight: bold;
    font-size: 18px;
    height: fit-content;
    align-self: center;
`

const Data = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    height: fit-content;
    padding: 0.25rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    border: 1px white solid;
    border-radius: 0.25rem;
`

const DataText = styled.text`
    color : white;
    font-weight: bold;
    font-size: 24px;
`

const DataLegend = styled.text`
    color : white;
    font-size: 12px;
`

const LogDataContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    justify-items: center;
    
`

const ProfileDataContainer = styled.div`
    min-width: 100%;
    display: flex;
    flex-direction: row;
    height: fit-content;
`

function Home_Profile({ openModal , setFormType})
{
    const user = useSelector(state => state.user);
    const rank = user.rank;
    const isAuthenticated = user.isAuthenticated;

    console.log("rank = " + user.rank);

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

    return (
        <ProfileContainer>
            <Auth>
            {
                isAuthenticated ? 
                (
                    <LogDataContainer>
                        <ProfileDataContainer>
                            <Pseudo>{user.user.username}</Pseudo>
                            <Data>
                                <DataText>{'' + rank}</DataText>
                                <DataLegend>Top</DataLegend>
                            </Data>
                            <Data>
                                <DataText>{user.user.score}</DataText>
                                <DataLegend>Score</DataLegend>
                            </Data>
                            <Data>
                                <DataText>{user.user.streak}</DataText>
                                <DataLegend>Streak</DataLegend>
                            </Data>
                        </ProfileDataContainer>
                        <Link onClick={() => dispatch(setIsAuthenticated({isAuthenticated : false, user : null, token : null}))}>Se deconnecter</Link>
                    </LogDataContainer>
                    
                ) : (
                    <Message>Pour participer au classement <Link onClick={() => openLogin()}>connectez-vous</Link> ou <Link onClick={() => openRegister()}>inscrivez-vous</Link> !</Message>
                )
            }
            </Auth>
            <Space/>
            <GoToRank>Voir le classement</GoToRank>
        </ProfileContainer>
    )
}

export default Home_Profile; 