import React , { useState } from 'react'
import styled from 'styled-components';

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 100%;
    min-width: 20rem;
    margin: 0.5rem;
`

const InputTitle = styled.h2`
    text-align: left;
    font-size: 14px;
    color: white;
`

const Input = styled.input`
    font-size: 14px;
    border-radius: 8px;
    font-weight: 600;
`

const ValidationButton = styled.div`
    background-color: white;
    color : black;
    padding: 0.5rem;
    font-size: 18px;
    font-weight: bold;
    align-self: center;
    border-radius: 8px;
    margin-top: 1rem;
    border : white solid 2px;
    cursor: pointer;
    &:hover {
        border : #ffdd33 solid 2px;
    }
`

const SubButton = styled.text`
    font: 10px;
    color: white;
    align-self: center;
    margin-top: 0.5rem;
`

const Link = styled.span`
    text-decoration: underline;
    cursor: pointer;
    
    &:hover {
        color : #ffdd33;
    }
`

function LoginModal({setFormType}) 
{
    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');
    
    return (
        <ModalContainer>
            <InputTitle>Nom d'utilisateur ou adresse mail</InputTitle>
            <Input type='text' value={username} placeholder={'Nom d\'utilisateur/Adresse mail'} onChange={(e) => setUsername(e.target.value)}/>
            <InputTitle>Mot de passe</InputTitle>
            <Input type='password' value={password} placeholder={'Mot de passe'} onChange={(e) => setPassword(e.target.value)}/>
            <ValidationButton>Se connecter</ValidationButton>
            <SubButton>Pas de compte ? <Link onClick={() => setFormType('REGISTER')}>S'inscrire</Link></SubButton>
        </ModalContainer>
    )
}

export default LoginModal;