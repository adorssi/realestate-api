const express = require('express');
const router = express.Router();
const propertyTypesController = require('../controllers/propertyTypesController');

router.get('/', propertyTypesController.listAll);
router.get('/:id', propertyTypesController.getOne);

router.post('/add', propertyTypesController.add);

router.patch('/:id', propertyTypesController.update);

router.delete('/:id', propertyTypesController.hardDelete);

module.exports = router;