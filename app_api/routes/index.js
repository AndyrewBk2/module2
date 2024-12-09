const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');  

router.get('/trips', tripsController.tripsList);
router.get('/trips/:code', tripsController.tripByCode);

module.exports = router;

