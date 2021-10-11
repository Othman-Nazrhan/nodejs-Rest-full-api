
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./router/stuff');
const userRoutes = require('./router/user');
const path = require('path');

// mongoose connexion

mongoose.connect('mongodb+srv://nodejs:8Q1nRQoJGwjvtCtl@cluster0.1ha5a.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-11e160-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true',
  
{ useNewUrlParser: true,
    useUnifiedTopology: true })
    
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// Erreurs de CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/stuff',  stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports= app;