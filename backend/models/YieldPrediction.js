const mongoose = require('mongoose');

const yieldPredictionSchema = new mongoose.Schema({
  Crop: { type: String, required: true },
  Season: { type: String, required: true },
  State: { type: String, required: true },
  Area: { type: Number, required: true },
  Annual_Rainfall: { type: Number, required: true },
  Fertilizer: { type: Number, required: true },
  Pesticide: { type: Number, required: true },
  Crop_Year: { type: Number, required: true },
  predicted_yield: { type: Number, required: true }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = mongoose.model('YieldPrediction', yieldPredictionSchema);
