const Thing = require('../models/thing');

exports.addThing = (req, res, next) => {
    const thinkObject = JSON.parse(req.body.thing);
    delete thinkObject._id;
    const thing = new Thing({
        ...thinkObject,
        imageUrl:
            `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistre ' }))
        .catch(error => res.status(400).json({ error }));
};

exports.updateThing = (req, res, next) => {
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }
        :
        { ...req.body };

    Thing.updateOne({ _id: req.params.id },
        { ...thingObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.deleteThing = ((req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
        .catch(error => res.status(400).json({ error }));
});

exports.getOneThing = ((req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
});

exports.getAllThing = ((req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
});

