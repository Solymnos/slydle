import React from 'react';
import styled , { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';

const rotate = keyframes`
    to {
        --angle: 360deg;
    }
`

const GameResultContainer = styled.div`
    display : flex;
    height: fit-content;
    width: fit-content;
    max-width: 100%;
    margin: 2rem;
    padding : 2rem;
    background-color: #121212;
    align-self: center;
    border-radius: 1rem;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    background: linear-gradient(#121212, #121212) padding-box,
              linear-gradient(var(--angle), #efd341, #1c42e4) border-box;
    border: 3px solid #0000;
    animation : ${rotate} 6s linear infinite;
    @media (max-width: 768px) {
        max-width: 100%;
        padding: 1rem;
        flex-direction: column;
        margin: 1rem;
    }
    
    @property --angle {
    syntax: "<angle>";
    initial-value: 0deg;
    inherits: false;
  }
`

const ResultImage = styled.img`
    max-width: 12rem;
`

const ResultDataContent = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
`
const ResultTitle = styled.h1`
    font-size: clamp(25px, 2.5vw, 45px);
    color: white;
`

const ResultText = styled.text`
    color: white;
    font-size: clamp(12px, 1.5vw, 20px);
`

const ResultDatas = styled.div`
    display: flex;
    flex-direction: row;
`

const YellowEmbed = styled.span`
  color : #efd341;
`

const BlueEmbed = styled.span`
  color: #1c42e4;
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
    border-radius: 0.5rem;
    justify-content: space-between;
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

const DataTwitter = styled.div`
    flex:1;
    display: flex;
    flex-direction: column;
    padding: 0.25rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    border: 1px white solid;
    border-radius: 0.5rem;
    justify-content: center;
    background-color: white;
    color: black;
    cursor: pointer;
`
const DataTextTwitter = styled.text`
    color : Black;
    font-weight: bold;
    font-size: clamp(15px, 1.5vw, 20px);
`

const GameResult = ({result, isVisible, tries, score}) => 
{

    const user = useSelector(state => state.user);
    let streak = 1;
    if (user.isAuthenticated)
    {
        streak = user.user.streak;
    }
  const handleTwitter = () =>
  {
    let link = `https://x.com/intent/post?text=J'ai participé au slydle.fr du jour et j'ai trouvé le résultat en seulement ${tries.toString()} coups !%0A%0A%23SLYWIN LFL OTP LOL évidemment`
    window.open(link, '_blank')
  }
  
  if (!isVisible)
  {
    return (
        <>
        
        </>
    )
  } else {
    return (
        <GameResultContainer>
            <ResultImage src={'.' + result.PlayerLogo}/>
            <ResultDataContent>
                <ResultTitle><YellowEmbed>G</YellowEmbed>G<BlueEmbed>!</BlueEmbed></ResultTitle>
                <ResultText>Félicitations ! Tu as trouvé <YellowEmbed>{result.Name}</YellowEmbed> qui est le guess du jour !</ResultText>
                <ResultDatas>
                    <Data> 
                        <DataText>{tries}</DataText>
                        <DataLegend>Essai(s)</DataLegend>
                    </Data>
                    <Data>
                        <DataText>+{score}</DataText>
                        <DataLegend>Score</DataLegend>
                    </Data>
                </ResultDatas>
                <ResultDatas>
                    <Data> 
                        <DataText>{streak}</DataText>
                        <DataLegend>Streak (+1)</DataLegend>
                    </Data>
                    <DataTwitter onClick={() => handleTwitter()}>
                        <DataTextTwitter>Partager sur Twitter</DataTextTwitter>
                    </DataTwitter>
                </ResultDatas>
            </ResultDataContent>
        </GameResultContainer>
    )
  }
}

export default GameResult