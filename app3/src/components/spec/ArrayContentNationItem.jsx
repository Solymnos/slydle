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
    min-height: 8rem;
    min-width: 8rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
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

const Flag = styled.img`
    max-width: 4rem;
    max-height: 4rem;
`

function ArrayContentNationItem({currentChoice, answer, animate}) 
{  
    if (currentChoice.Nation === answer.Nation)
    {
        if (animate)
        {
            return (
                <GoodItem delay={0.8} animate={true}>
                    <Flag src={'.' + currentChoice.NationLogo} />
                    {currentChoice.NationName}
                </GoodItem>
            )
        } else 
        {
            return (
                <GoodItemUnanimated>
                    <Flag src={'.' + currentChoice.NationLogo} />
                    {currentChoice.NationName}
                </GoodItemUnanimated>
            )
        }
    } else {
        if (animate)
        {
            return (
                <BadItem delay={0.8} animate={true}>
                    <Flag src={'.' + currentChoice.NationLogo} />
                    {currentChoice.NationName}
                </BadItem>
            )
        } else {
            return (
                <BadItemUnanimated>
                    <Flag src={'.' + currentChoice.NationLogo} />
                    {currentChoice.NationName}
                </BadItemUnanimated>
            )
        }
    }
}

export default ArrayContentNationItem