const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');
const auth = require('../middelware/auth');
const multer =require('../middelware/multer_fileConfig');



router.get('/',auth, stuffCtrl.getAllThing);

router.get('/:id', auth, stuffCtrl.getOneThing);
router.post('/',auth, multer , stuffCtrl.addThing);
router.put('/:id', auth,multer , stuffCtrl.updateThing);
router.delete('/:id', auth,stuffCtrl.deleteThing);


module.exports = router;