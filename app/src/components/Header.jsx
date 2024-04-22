import React from 'react';
import styled from 'styled-components';
import HeaderLogo from '../img/Header_Logo.png';

const HeaderContainer = styled.header`
    color: white;
    height: 10rem;
    font-family: 'Thunder', sans-serif;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-top: 2rem;
`;

const HeaderIcon = styled.img`
    height: 10rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
`;

function Header() {
  return (
    <HeaderContainer>
        <HeaderIcon src={HeaderLogo}/>
    </HeaderContainer>
  )
}

export default Header