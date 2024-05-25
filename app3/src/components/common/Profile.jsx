import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProfileContainer = styled.div`
  background-color: #121212;
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const RankNavButton = styled.div`
  box-sizing: border-box;
  padding: 10px 20px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  font-size: clamp(10px, 1.5vw, 45px);
  max-width: 45%;
  color: white;
  border: 1px solid #efd341;
  background-image: linear-gradient(45deg, #efd341 50%, transparent 50%);
  background-position: 100%;
  background-size: 400%;
  transition: background 300ms ease-in-out;
  margin: 1rem;
  &:hover {
    background-position: 0;
    color: black;
    outline: 0;
  }
`;

const UserInfo = styled.div`
  max-width: 45%;
  margin: 1rem;
  padding: 0%;
`

const LoginButton = styled.button`
  box-sizing: border-box;
  padding: 10px 20px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  font-size: clamp(10px, 1.5vw, 45px);
  height: 100%;
  color: white;
  border: 1px solid #1c42e4;
  background-image: linear-gradient(45deg, #1c42e4 50%, transparent 50%);
  background-position: 100%;
  background-size: 400%;
  transition: background 300ms ease-in-out;
  &:hover {
    background-position: 0;
    color: white;
    outline: 0;
  }
`;

const UserInfoText = styled.h1`
  font-family: 'OffBit';
  font-size: clamp(14px, 1.5vw, 45px);
  color : white;
`

const YellowEmbed = styled.span`
  color : #efd341;
`

const BlueEmbed = styled.span`
  color: #1c42e4;
`

const Profile = ({setShowModal}) => 
{
  const user = useSelector(state => state.user);
  const isAuthenticated = user.isAuthenticated;
  
  const navigate = useNavigate();
  
  return (
    <ProfileContainer>
      <UserInfo>
        {
        isAuthenticated ?
        (
          <UserInfoText>{user.user.username} <YellowEmbed>\\</YellowEmbed> Top {user.rank} <BlueEmbed>\\</BlueEmbed> Score : {user.user.score} <YellowEmbed>\\</YellowEmbed> Streak : {user.user.streak}</UserInfoText>
        ) : (
          <LoginButton onClick={() => setShowModal(true)}>Se connecter / S'inscrire</LoginButton>
        )
      }
      </UserInfo>
      <RankNavButton onClick={() => navigate('/rank')}>Voir le classement</RankNavButton>
    </ProfileContainer>
  )
}

export default Profile