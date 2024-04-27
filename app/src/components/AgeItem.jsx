import React from 'react'
import styled, { css } from 'styled-components';
import { flipAnimation } from './Animation';

const MixedItem = styled.div`
    flex: 1;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #FF7F50;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #FF7F50 solid;
    font-weight: bold;
    opacity: 0;
    height: 6rem;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const MixedItemUnanimated = styled.div`
    flex: 1;
    height: 6rem;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #FF7F50;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #FF7F50 solid;
    font-weight: bold;
`

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

function AgeItem({currentChoice, answer, animate}) 
{   
    if (currentChoice.Age === '-' || answer.Age === '-')
    {
        if (animate)
        {
            return (
                <MixedItem delay={0.2} animate={true}>{currentChoice.Age}</MixedItem>
            )
        }
        else {
            return (
                <MixedItemUnanimated>{currentChoice.Age}</MixedItemUnanimated>
            )
        }
    } else if (currentChoice.Age === answer.Age)
    {
        if (animate)
        {
            return (
                <GoodItem delay={0.2} animate={true}>{currentChoice.Age}</GoodItem>
            )
        } else {
            return (
                <GoodItemUnanimated>{currentChoice.Age}</GoodItemUnanimated>
            )
        }
    } else {
        // TODO : ajouter image fleche vers le haut ou vers le bas
        if (animate)
        {
            return (
                <BadItem delay={0.2} animate={true}>{currentChoice.Age}</BadItem>
            )
        } else 
        {
            return (
                <BadItemUnanimated>{currentChoice.Age}</BadItemUnanimated>
            )
        }
    }
}

export default AgeItem