import React from 'react'
import styled, { css } from 'styled-components';
import { flipAnimation } from './Animation';

const Item = styled.div`
    flex: 1;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #181818;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #1D40DA solid;
    font-weight: bold;
    opacity: 0;
    height: 6rem;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const ItemUnanimated = styled.div`
    flex: 1;
    height: 6rem;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #181818;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #1D40DA solid;
    font-weight: bold;
`

function PseudoItem({currentChoice, animate}) 
{  
  if (animate)
  {
    return (
        <Item delay={0} animate={true}>{currentChoice.Name}</Item>
    )
  }
  else 
  {
    return (
        <ItemUnanimated>{currentChoice.Name}</ItemUnanimated>
    )
  }
}

export default PseudoItem