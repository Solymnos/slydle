const express   = require('express');
const app       = express();
const mongoose  = require('mongoose');
const authRoutes = require('./src/routes/auth');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URL).then(() =>
{
    console.log('Connexion à la base de données réussie !');
}).catch(() => {
    console.log('Echec de la connexion à la base de données.');
})

app.use(express.json());

//app.use('');
app.use('/auth/', authRoutes);


app.listen(4000, () => console.log('Server started !'));