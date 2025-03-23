const express = require('express');
const router = express.Router();
const yieldController = require('../controllers/yieldController');

// Save prediction endpoint
router.post('/save-prediction', yieldController.saveYieldPrediction);

// Get all predictions endpoint
router.get('/predictions', yieldController.getAllPredictions); // Ensure this matches controller export

module.exports = router;