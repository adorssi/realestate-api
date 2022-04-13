const express = require('express');
const router = express.Router();
const amenitieController = require('../controllers/amenitieController');

router.post('/', amenitieController.add);

module.exports = router;