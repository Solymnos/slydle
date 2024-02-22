const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async(req, res) =>
{
    const mail = req.query.mail;
    const password = req.query.password;
    const username = req.query.username;

    try {
        const mailExist = await User.findOne({ mail : mail});
        if (mailExist != null)
        {
            return res.status(400).json({ error : 'Email déjà utilisé'});
        }
        const userNameExist = await User.findOne({ username : username });
        if (userNameExist != null)
        {
            return res.status(400).json({ error : 'Pseudo déjà utilisé'});
        }
        const newUser = new User(
            {
                mail : mail,
                username : username,
                password : await bcrypt.hash(password, 10),
            }
        )
        await newUser.save();
    } catch (error)
    {
        console.error(error);
    }
    res.status(200).json({ message : 'Utilisateur enregistré !'});
});

router.get('/login', async(req, res) =>
{
    const login = req.query.login;
    const password = req.query.password;

    try {
        const userExist = await User.findOne({ $or : [{ mail : login } , { username : login }]});
        if (userExist === null)
        {
            return res.status(400).json({ error : 'Mail ou Nom d\'utilisateur introuvable'});
        }
        const passwordMatch = await bcrypt.compare(password, userExist.password);
        if (!passwordMatch)
        {
            return res.status(400).json({ error : 'Mot de passe invalide'});
        }
        const token = jwt.sign({ userId : userExist.username }, /* SECRET ,*/ { expiresIn : '1W'});
        res.status(200).json({ message : 'Login réussi', token});
    } catch (error)
    {
        console.error(error);
    }
})

router.put('/password', async(req, res) =>
{
    const password = req.query.password;
    const username = req.query.username;

    try  {
        const userExist = await User.findOne({ username : username });
        if (userExist === null)
        {
            return res.status(400).json({ error : 'Nom d\'utilisateur introuvable'});
        }
        userExist.password = password;
        await userExist.save();
    } catch (error)
    {
        console.error(error);
    }
    res.status(200).json({ message : 'Mot de passe mis à jour'});
});

router.put('/username', async(req, res) =>
{
    const username = req.query.username;
    const new_username = req.query.new_username;

    try {
        const userExist = await User.findOne({ username : username });
        if (userExist === null)
        {
            return res.status(400).json({ error : 'Nom d\'utilisateur introuvable'});
        }
        userExist.username = new_username;
        await userExist.save();
    } catch (error)
    {
        console.error(error);
    }
    res.status(200).json({ message : 'Nom d\'utilisateur mis à jour'});
});

router.delete('/', async(req, res) =>
{
    const username = req.query.username;

    try {
        const userExist = await User.findOne({ username : username });
        if (userExist === null)
        {
            return res.status(400).json({ error : 'Nom d\'utilisateur introuvable'});
        }
        await userExist.remove();
    } catch (error)
    {
        console.error(error);
    }
    res.status.json({ message : 'Utilisateur supprimé !'});
});

module.exports = router;

/*
 * Fonctionnement classique : 
 * 1) Ouverture page : Chargement Choix/Daily/Classement
 * 1b) Si déjà log, Charge aussi les données utilisateur, met à jour le token et le retourne => Le chargement des données utilisateurs néscessite un token valide
 * 2) Incription/Login/Changement profile : si succès retourne un nouveau token 
 * 3) Update Score nescessite aussi un token valide
 * 4) Suppression profil néscessite aussi un token valide
 * 
 * TO DO : ajouter la gestion du token dans l'inscription et le changement du profil
 */