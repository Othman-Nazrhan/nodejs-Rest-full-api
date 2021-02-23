const http = require('http');
const app = require('./app');
const mongoose = require('mongoose');

app.set( 'port' ,process.env.PORT || 3000);

// mongoose connexion

mongoose.connect('mongodb+srv://nodejs:8Q1nRQoJGwjvtCtl@cluster0.1ha5a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const server = http.createServer(app) ;
server.listen(process.env.PORT || 3000);