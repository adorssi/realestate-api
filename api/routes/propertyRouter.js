const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');

router.get('/', propertyController.listAll);
router.get('/published', propertyController.listAllPublished);
router.get('/featured', propertyController.listAllFeatured);
router.get('/detail', propertyController.detail);
router.get('/:id', propertyController.getOne);
router.get('/restore/:id', propertyController.restore);

router.post('/add', propertyController.add);

router.patch('/:id', propertyController.update);

router.delete('/s/:id', propertyController.softDelete);
router.delete('/h/:id', propertyController.hardDelete);

module.exports = router;