import React, { useState , useEffect }from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { getRanking } from '../hooks/Data';
import Header from '../components/common/Header';


const PageContainer = styled.div`
    min-height: 100vh;
    max-height: fit-content;
    min-width: 100vw;
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    background-color: #181818;
    padding-top: 2rem;
    padding-bottom: 2rem;
`

const RankingContainer = styled.div`
  width: 50%;
  height: auto;
  overflow-x: auto;
  margin-top: 2rem;
  align-self: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 1rem;
    padding: 0rem 1rem;
  }
`
const RankingHeader = styled.div`
  width: 100%;
  height: auto;
  background-color: #282828;
  display: flex;
  flex-direction: row;
  color: white;
  font-size: clamp(18px, 1.5vm, 24px);
  font-weight: bold;
  border-bottom: 1px #282828 solid;
`

const RankingLine = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  color: white;
  font-size: clamp(15px, 1.5vm, 20px);
  border-bottom: 1px #282828 solid; 
`

const RankingLineMe = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  color: white;
  font-size: clamp(15px, 1.5vm, 20px);
  border : 2px #ffdd33 solid;
`

const Pseudo = styled.div`
  flex : 2;
  padding: 1rem;
  font-weight: bold;
`

const Single = styled.div `
  flex : 1;
  padding: 1rem;
  text-align: center;
`



const RankingPage = () => 
{
  const [ ranking , setRanking ] = useState([]);  
  
  const user = useSelector(state => state.user);
  
  useEffect(() => {
    async function fetchRanking() {
      const response = await getRanking();
      let rankingData = response.response.data.users_ranking;
      setRanking(rankingData);
    }
    fetchRanking();
  }, [])
  
  const getLine = (rank, user) =>
  {
    if (user.isAuthenticated)
    {
      if (user.user._id.$oid === rank.id)
      {
        return (
          <RankingLineMe>
            <Pseudo>{rank.username}</Pseudo>
            <Single>{rank.score}</Single>
            <Single>{rank.streak}</Single>
          </RankingLineMe>
        )
      }
    }
    return (
      <RankingLine>
        <Pseudo>{rank.username}</Pseudo>
        <Single>{rank.score}</Single>
        <Single>{rank.streak}</Single>
      </RankingLine>
    )
  };
  
  return (
    <PageContainer>
      <Header />
      <RankingContainer>
        <RankingHeader>
          <Pseudo>Pseudo</Pseudo>
          <Single>Score</Single>
          <Single>Streak</Single>
        </RankingHeader>
        {ranking.map(rank => getLine(rank, user))}
      </RankingContainer>
    </PageContainer>
  )
}

export default RankingPage