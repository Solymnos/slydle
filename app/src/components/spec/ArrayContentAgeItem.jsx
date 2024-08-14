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
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const BadItemUnanimated = styled.div`
    flex: 1;
    min-height: 8rem;
    min-width: 8rem;
    color: white;
    align-content: space-around;
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
const Img = styled.img`
    height: 3rem;
    height: 3rem;
    transform: ${({ flipped }) => flipped ? 'scaleY(-1)' : 'none'};
`

function ArrayContentAgeItem({currentChoice, answer, animate}) 
{   
    if (currentChoice.Age === undefined || answer.Age === undefined)
    {
        return (
            <></>
        )
    }
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
        let rotate = false;
        if (currentChoice.Age > answer.Age)
        {
            rotate = true;  
        }
        if (animate)
        {
            return (
                <BadItem delay={0.2} animate={true}>
                    <Img src={'./img/icons/Arrow.png'} flipped={rotate}/>
                    {currentChoice.Age}
                </BadItem>
            )
        } else 
        {
            return (
                <BadItemUnanimated>
                    <Img src={'./img/icons/Arrow.png'} flipped={rotate}/>
                    {currentChoice.Age}
                </BadItemUnanimated>
            )
        }
    }
}

export default ArrayContentAgeItem