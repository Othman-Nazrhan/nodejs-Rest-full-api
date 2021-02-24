
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');


// mongoose connexion

mongoose.connect('mongodb+srv://nodejs:8Q1nRQoJGwjvtCtl@cluster0.1ha5a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  
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

  
  app.use(bodyParser.json());

// route POST GET UPDATE 

// get

app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});

// post

app.post('/api/stuff',(req,res, next) => {
 delete req.body._id; 
 const thing = new Thing ({
   ...req.body
 });
 thing.save()

 .then(() => res.status(201).json({ message: 'Objet enregistre '}))
 .catch (error  => res.status(400).json({ error }));

});

// update

app.put( '/api/stuff/:id' ,(rep, res, next) => {
  Thing.updateOne({ _id: rep.params.id }, { ...rep.body, _id: rep.params.id })
  .then (() => res.status(200).json({ message :'objet modifie !' }))
  .catch( error => res.status(400).json)({  error });
})

//  delete
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});


app.use('/api/stuff', (req, res, next) => {
  Thing.find()
  .then (things =>res.status(200).json(things))
  .catch (error => res.status(400).json({ error }));

  
  });

module.exports= app;