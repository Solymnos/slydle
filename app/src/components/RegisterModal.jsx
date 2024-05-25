import React , { useState } from 'react'
import styled from 'styled-components';
import api_register from '../utils/Api';

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

const ErrorText = styled.text`
    font-size: 12px;
    color: red;
`

function RegisterModal({setFormType}) 
{
    const [ username , setUsername ] = useState('');
    const [ password , setPassword ] = useState('');
    const [ email , setEmail ] = useState('');
    const [ validPassword , setValidPassword ] = useState('');
    const [ error, setError ] = useState('');

    const register = async() =>
    {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (username === '' || password === '' || email === '')
        {
            setError('Merci de remplir tous les champs')
        } else if (!regex.test(email))
        {
            setError('Adresse email invalide')
        } else if (password !== validPassword)
        {
            setError('Les deux mots de passe ne correspondent pas')
        } else {
            setError('');
            try {
                const response = await api_register(username, email, password);
                console.log(response);
            } catch (error) {
                if (error.response && error.response.status === 422)
                {
                    console.log('Erreur VALIDATION: ' + error.response.data);
                } else {
                    console.log(error);
                }
            }
        }
    }
    
    return (
        <ModalContainer>
            <ErrorText>{error}</ErrorText>
            <InputTitle>Nom d'utilisateur</InputTitle>
            <Input type='text' value={username} placeholder={'Nom d\'utilisateur'} onChange={(e) => setUsername(e.target.value)}/>
            <InputTitle>Adresse mail</InputTitle>
            <Input type='text' value={email} placeholder={'Adresse mail'} onChange={(e) => setEmail(e.target.value)}/>
            <InputTitle>Mot de passe</InputTitle>
            <Input type='password' value={password} placeholder={'Mot de passe'} onChange={(e) => setPassword(e.target.value)}/>
            <InputTitle>Validation mot de passe</InputTitle>
            <Input type='password' value={validPassword} placeholder={'Mot de passe'} onChange={(e) => setValidPassword(e.target.value)}/>
            <ValidationButton onClick={async() => await register()}>S'inscrire</ValidationButton>
            <SubButton>Déjà un compte ? <Link onClick={() => setFormType('LOGIN')}>Se connecter</Link></SubButton>
        </ModalContainer>
    )
}

export default RegisterModal;