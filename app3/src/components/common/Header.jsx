import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    color: white;
    max-height: 10rem;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    justify-content: center;
`;

const HeaderIcon = styled.img`
    height: auto;
    max-width: 25%;
    
    @media (max-width: 768px) {
      max-width: 80%;
      max-height: 10rem;
      padding-left: 2rem;
      padding-right: 2rem;
    }
`;

function Header() {
  return (
    <HeaderContainer>
        <HeaderIcon src={'/img/Header_Logo.png'}/>
    </HeaderContainer>
  )
}

export default Header