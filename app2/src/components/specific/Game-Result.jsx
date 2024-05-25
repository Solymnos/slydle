import React from 'react';
import styled from 'styled-components';

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
`

const ResultContainer = styled.div`
    background-color: #282828;
    border: #ffffff 1px solid;
    border-radius: 18px;
    min-width: 28rem;
    max-width: 32rem;
    padding: 1rem;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const ResultTop = styled.div`
    display: flex;
    flex-direction: row;
`

const ResultRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    margin-left: 0.5rem;
`

const ResultImage = styled.img`
    width: 12rem;
`

const ResultText = styled.text`
    color : white;
    font-size : 20px;
    white-space: pre-wrap;
    margin: 0.5rem;
`

const Embed = styled.text`
    font-weight: bold;
`

const ResultData = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
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
    border: 1px #00ACEE solid;
    border-radius: 0.5rem;
    justify-content: space-between;
    background-color: #00ACEE;
    cursor: pointer;
`

const DataImg = styled.img`
    height: 24px;
    width: auto;
    object-fit: contain;
`

function Game_Result({ result, isVisible, tries, score }) {
  if (!isVisible)
  {
    return (
            <></>
        )
  } else {
    return (
        <ContentContainer>
            <ResultContainer>
                <ResultTop>
                    <ResultImage src={'.' + result.PlayerLogo } />
                    <ResultRight>
                        <ResultText>{'Félicitations, tu as trouvé '}<Embed>{result.Name}</Embed>{' qui était la personne à trouver aujourd' + `\'` + 'hui !'}</ResultText>
                        <ResultData>
                            <Data> 
                                <DataText>{tries}</DataText>
                                <DataLegend>Essai(s)</DataLegend>
                            </Data>
                            <Data>
                                <DataText>+{score}</DataText>
                                <DataLegend>Score</DataLegend>
                            </Data>
                            <DataTwitter>
                                <DataImg src={'./img/icons/Twitter.png'}/>
                                <DataLegend>Partager sur X</DataLegend>
                            </DataTwitter>
                        </ResultData>
                    </ResultRight>
                </ResultTop>
            </ResultContainer>
        </ContentContainer>    
      )
  }
}

export default Game_Result;