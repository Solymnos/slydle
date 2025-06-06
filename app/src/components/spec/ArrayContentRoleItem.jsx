import React from 'react'
import styled, { css } from 'styled-components';
import { flipAnimation } from '../../utils/Animation';

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
    min-height: 8rem;
    min-width: 8rem;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const MixedItemUnanimated = styled.div`
    flex: 1;
    min-height: 8rem;
    min-width: 8rem;
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
    min-height: 8rem;
    min-width: 8rem;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const GoodItemUnanimated = styled.div`
    flex: 1;
    min-height: 8rem;
    min-width: 8rem;
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
    min-height: 8rem;
    min-width: 8rem;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const BadItemUnanimated = styled.div`
    flex: 1;
    min-height: 8rem;
    min-width: 8rem;
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

function ArrayContentRoleItem({currentChoice, answer, animate}) 
{
    
    if (!currentChoice.Role || !answer.Role)
    {
        return (
            <></>
        )
    }
    
    if (currentChoice.Role === undefined || answer.Role === undefined)   {
        return (
            <></>
        )
    }
    
    const equal = (a, b) => {
        const copyA = [...a];
        const copyB = [...b];
        
        copyA.sort();
        copyB.sort();
        
        return JSON.stringify(copyA) === JSON.stringify(copyB)
    }
    
    const txt = currentChoice.Role.join(' / ');
    
    if (equal(currentChoice.Role, answer.Role))
    {
        if (animate)
        {
            return (
                <GoodItem delay={0.4} animate={true}>{txt}</GoodItem>
            )
        } else 
        {
            return (
                <GoodItemUnanimated>{txt}</GoodItemUnanimated>
            )
        }
    }
    else if (answer.Role.some(element => currentChoice.Role.includes(element)))
    {
        if (animate)
        {
            return (
                <MixedItem delay={0.4} animate={true}>{txt}</MixedItem>
            )
        } else 
        {
            return (
                <MixedItemUnanimated>{txt}</MixedItemUnanimated>
            )
        }
    } else {
        if (animate)
        {
            return (
                <BadItem delay={0.4} animate={true}>{txt}</BadItem>
            )
        } else {
            return (
                <BadItemUnanimated>{txt}</BadItemUnanimated>
            )
        }
    }
}

export default ArrayContentRoleItem