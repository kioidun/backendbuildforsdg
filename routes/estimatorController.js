const express = require('express');
const router = express.Router();
const EstimatorController = require('../controllers/estimatorController')
const validator = require('express-validator');

//GET
router.post('/on-covid-19', EstimatorController.getEstimations);
//POST




module.exports = router;