const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/', propertyController.listAll);
router.get('/published', propertyController.listAllPublished);
router.get('/:id', propertyController.getOne);

router.post('/add', propertyController.add);

router.patch('/:id', propertyController.update);

router.delete('/s/:id', propertyController.softDelete);
router.delete('/h/:id', propertyController.hardDelete);
router.get('/restore/:id', propertyController.restore);

module.exports = router;