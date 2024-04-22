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
    background-color: #8B0000 ;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #8B0000 solid;
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
    background-color: #8B0000 ;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #8B0000 solid;
    font-weight: bold;
`

// TODO : Ajouter l'image du drapeau du pays

function NationItem({currentChoice, answer, animate}) 
{  
    if (currentChoice.Nation === answer.Nation)
    {
        if (animate)
        {
            return (
                <GoodItem delay={0.8} animate={true}>{currentChoice.NationName}</GoodItem>
            )
        } else 
        {
            return (
                <GoodItemUnanimated>{currentChoice.NationName}</GoodItemUnanimated>
            )
        }
    } else {
        if (animate)
        {
            return (
                <BadItem delay={0.8} animate={true}>{currentChoice.NationName}</BadItem>
            )
        } else {
            return (
                <BadItemUnanimated>{currentChoice.NationName}</BadItemUnanimated>
            )
        }
    }
}

export default NationItem