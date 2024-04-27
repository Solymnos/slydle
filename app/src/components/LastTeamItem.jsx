import React from 'react'
import styled, { css } from 'styled-components';
import { flipAnimation } from './Animation';

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
`

// TODO : Ajouter Image de l'équipe
// TODO : Modifier pour bien gérer l'équipe précédente

function LastTeamItem({currentChoice, answer, animate}) 
{  
    if (currentChoice.Actual === answer.Actual)
    {
        if (animate)
        {
            return (
                <GoodItem delay={1.0} animate={true}>{currentChoice.Actual}</GoodItem>
            )
        } else 
        {
            return (
                <GoodItemUnanimated>{currentChoice.Actual}</GoodItemUnanimated>
            )
        }
    } else {
        if (animate)
        {
            return (
                <BadItem delay={1.0} animate={true}>{currentChoice.Actual}</BadItem>
            )
        } else {
            return (
                <BadItemUnanimated>{currentChoice.Actual}</BadItemUnanimated>
            )
        }
    }
}

export default LastTeamItem