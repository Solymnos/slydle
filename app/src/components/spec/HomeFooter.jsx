import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.div`
    width: 100%;
    color : white;
    height: auto;
    justify-content: center;
    text-align: center;
    font-size: clamp(10px, 1vw, 15px);
    font-weight: bold;
    margin-top: 2rem;
    @media (max-width: 768px) {
        margin-top: 1rem;
    }
`

const Embed = styled.span`
    text-decoration: underline;
    cursor: pointer;
    &:hover {
        color : #1c42e4;
    }
`

const HomeFooter = () => {
    const LinkToProfile = () =>
    {
        window.open('https://x.com/Solymnos', '_blank')
    }

  return (
    <FooterContainer>
        <Embed onClick={() => LinkToProfile()}>Made by Soly</Embed> 💛💙
    </FooterContainer>
  )
}

export default HomeFooter