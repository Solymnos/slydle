import React from 'react'
import styled, { css } from 'styled-components';
import { flipAnimation } from '../../utils/Animation';

const GoodItem = styled.div`
    flex: 1;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #2E8B57  ;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #2E8B57  solid;
    font-weight: bold;
    opacity: 0;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const GoodItemUnanimated = styled.div`
    flex: 1;
    height: 6rem;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #2E8B57 ;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #2E8B57  solid;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const BadItem = styled.div`
    flex: 1;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #B22222 ;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #B22222 solid;
    font-weight: bold;
    opacity: 0;
    height: 6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const BadItemUnanimated = styled.div`
    flex: 1;
    height: 6rem;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #B22222 ;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #B22222 solid;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const TeamLogo = styled.img`
    max-width: 4rem;
    max-height: 4rem;
`

// TODO : Ajouter Image de l'équipe

function ArrayContent_ActualTeamItem({currentChoice, answer, animate}) 
{  
    if (currentChoice.Actual === answer.Actual)
    {
        if (animate)
        {
            return (
                <GoodItem delay={1.2} animate={true}>
                    <TeamLogo src={'.' + currentChoice.ActualLogo} />
                    {currentChoice.Actual}
                </GoodItem>
            )
        } else 
        {
            return (
                <GoodItemUnanimated>
                    <TeamLogo src={'.' + currentChoice.ActualLogo} />
                    {currentChoice.Actual
                }</GoodItemUnanimated>
            )
        }
    } else {
        if (animate)
        {
            return (
                <BadItem delay={1.2} animate={true}>
                    <TeamLogo src={'.' + currentChoice.ActualLogo} />
                    {currentChoice.Actual}
                </BadItem>
            )
        } else {
            return (
                <BadItemUnanimated>
                    <TeamLogo src={'.' + currentChoice.ActualLogo} />
                    {currentChoice.Actual}
                </BadItemUnanimated>
            )
        }
    }
}

export default ArrayContent_ActualTeamItem