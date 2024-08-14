import React from 'react';
import styled, { keyframes } from 'styled-components';

const HeaderContainer = styled.header`
    color: white;
    max-height: 12rem;
    max-width: 100%;
    display: flex;
    flex-direction: column;
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

const scroll = keyframes`
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
`;


const BannerContainer = styled.div`
  background-color: #efd341; // Couleur de fond du bandeau
  color: #000; // Couleur du texte
  width: 100%;
  font-weight: bold;
  font-size: large;
  cursor: pointer;
  display: flex;
  justify-content: center;
`;

// Style pour le texte défilant
const MarqueeText = styled.div`
  display: inline-block;
`;

function Header() {
  
  const handleClick = () =>
  {
    let link = `https://www.solary.fr/p/slywindor/vote/meilleure-creation`
    window.open(link, '_blank');
  }

  return (
    <HeaderContainer>
        <BannerContainer onClick={() => handleClick()}>
          <MarqueeText>{'Si le projet vous plaît, votez pour moi aux slywindor svp \<3'}</MarqueeText>
        </BannerContainer>
        <HeaderIcon src={'/img/Header_Logo.png'}/>
    </HeaderContainer>
  )
}

export default Header