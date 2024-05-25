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

const Img = styled.img`
    width: 3rem;
    height: 3rem;
    transform: ${({ flipped }) => flipped ? 'scaleY(-1)' : 'none'};
`

function EndYearItem({currentChoice, answer, animate}) 
{
    if (currentChoice.EndYear === answer.EndYear)
    {
        if (animate)
        {
            return (
                <GoodItem delay={1.6} animate={true}>{currentChoice.EndYear}</GoodItem>
            )
        } else 
        {
            return (
                <GoodItemUnanimated>{currentChoice.EndYear}</GoodItemUnanimated>
            )
        }
    } else {
        let rotate = false;
        if (currentChoice.EndYear > answer.EndYear || currentChoice.answer === 'Présent')
        {
            rotate = true
        }
        if (animate)
        {
            return (
                <BadItem delay={1.6} animate={true}>
                    <Img src={'./img/icons/Arrow.png'} flipped={rotate}/>
                    {currentChoice.EndYear}
                </BadItem>
            )
        } else {
            return (
                <BadItemUnanimated>
                    <Img src={'./img/icons/Arrow.png'} flipped={rotate}/>
                    {currentChoice.EndYear}
                </BadItemUnanimated>
            )
        }
    }
}

export default EndYearItem