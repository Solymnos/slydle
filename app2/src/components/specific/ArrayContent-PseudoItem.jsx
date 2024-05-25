import React from 'react'
import styled, { css } from 'styled-components';
import { flipAnimation } from '../../utils/Animation';

const Item = styled.div`
    flex: 1;
    height: 8rem;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #181818;
    border-radius: 0.75rem;
    border : 2px #1D40DA solid;
    font-weight: bold;
    position: relative;
    flex-direction: column;
    ${({ animate , delay }) =>
        animate && css`animation: ${flipAnimation} 1s ease ${delay}s forwards;`
    }
`

const ItemUnanimated = styled.div`
    flex: 1;
    height: 8rem;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #181818;
    border-radius: 0.75rem;
    border : 2px #1D40DA solid;
    font-weight: bold;
    position: relative;
    flex-direction: column;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.75rem;
  margin-top: 2px;
`

const Text = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #181818;
  color: white;
  border-bottom-left-radius : 0.75rem;
  border-bottom-right-radius : 0.75rem;
`

function ArrayContent_PseudoItem({currentChoice, animate}) 
{
  if (animate)
  {
    return (
        <Item delay={0} animate={true}>
          <Img src={'.' + currentChoice.PlayerLogo} alt={'Img de ' + currentChoice.Name}/>
          <Text>{currentChoice.Name}</Text>
        </Item>
    )
  }
  else 
  {
    return (
        <ItemUnanimated>
          <Img src={'.' + currentChoice.PlayerLogo} alt={'Img de ' + currentChoice.Name}/>
          <Text>{currentChoice.Name}</Text>
        </ItemUnanimated>
    )
  }
}

export default ArrayContent_PseudoItem