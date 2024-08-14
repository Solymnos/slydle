import React from 'react'
import styled from 'styled-components'

import GameArrayHeader from './GameArrayHeader'
import GameArrayContent from './GameArrayContent'

const GameArrayContainer = styled.div`
    display: flex;
    width: 100%;
    height: auto;
    margin-top: 2rem;
    padding: 0rem 10rem;
    overflow-y: auto;
    overflow-x: auto;
    white-space: nowrap;
    flex-direction: column;
    -ms-overflow-style: auto;  /* IE and Edge */
    scrollbar-width: auto;  /* Firefox */
    scrollbar-color: auto; /* Firefox */
    @media (max-width: 768px) {
        margin-top: 1rem;
        padding : 0rem 1rem;
    }
    &::-webkit-scrollbar {
      display: block;
    }
`



const HomeGameArray = ({items , animationTrigger, answer}) => {
  return (
    <GameArrayContainer>
        <GameArrayHeader/>
        <GameArrayContent items={items} animationTrigger={animationTrigger} answer={answer} />
    </GameArrayContainer>
  )
}

export default HomeGameArray