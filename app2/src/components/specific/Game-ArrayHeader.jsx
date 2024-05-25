import React from 'react';
import styled from 'styled-components';

const ArrayHeaderContainer = styled.div`
    display: flex;
    gap: 1.5rem;
    flex-direction: row;
    width: 100%;
`
const ArrayHeaderItem = styled.div`
    flex: 1;
    color: white;
    align-content: center;
    align-items: center;
    text-align: center;
    background-color: #181A3C;
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-radius: 0.75rem;
    border : 2px #1D40DA solid;
    font-weight: bold;
`

function Game_ArrayHeader() {
  return (
    <ArrayHeaderContainer>
        <ArrayHeaderItem>Pseudo</ArrayHeaderItem>
        <ArrayHeaderItem>Age</ArrayHeaderItem>
        <ArrayHeaderItem>Rôle</ArrayHeaderItem>
        <ArrayHeaderItem>Jeu</ArrayHeaderItem>
        <ArrayHeaderItem>Nationalité</ArrayHeaderItem>
        <ArrayHeaderItem>Equipe Précédente</ArrayHeaderItem>
        <ArrayHeaderItem>Equipe Actuelle</ArrayHeaderItem>
        <ArrayHeaderItem>Année Arrivée</ArrayHeaderItem>
        <ArrayHeaderItem>Année Départ</ArrayHeaderItem>
    </ArrayHeaderContainer>
  )
}

export default Game_ArrayHeader