// const YieldPrediction = require('../models/YieldPrediction');

// // Save new yield prediction
// exports.saveYieldPrediction = async (req, res) => {
//     try {
//         const predictionData = req.body;
        
//         const requiredFields = ['Crop', 'Season', 'State', 'Area', 'Annual_Rainfall', 
//                                 'Fertilizer', 'Pesticide', 'Crop_Year', 'predicted_yield'];

//         const missingFields = requiredFields.filter(field => !(field in predictionData));

//         if (missingFields.length > 0) {
//             return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
//         }

//         const newPrediction = new YieldPrediction({
//             Crop: predictionData.Crop,
//             Season: predictionData.Season,
//             State: predictionData.State,
//             Area: parseFloat(predictionData.Area),
//             Annual_Rainfall: parseFloat(predictionData.Annual_Rainfall),
//             Fertilizer: parseFloat(predictionData.Fertilizer),
//             Pesticide: parseFloat(predictionData.Pesticide),
//             Crop_Year: parseInt(predictionData.Crop_Year, 10),
//             predicted_yield: parseFloat(predictionData.predicted_yield) // Ensure numeric type
//         });
//         console.log("Hello");
//         await newPrediction.save();
//         res.status(201).json({ message: "Yield prediction saved successfully", data: newPrediction });

//     } catch (error) {
//         console.error("Error saving prediction:", error);
//         res.status(500).json({ message: "Error saving yield prediction", error: error.message });
//     }
// };


// // Get all yield predictions
// exports.getAllPredictions = async (req, res) => {
//     try {
//         const predictions = await YieldPrediction.find().sort({ createdAt: -1 });
//         res.json(predictions);
//     } catch (error) {
//         res.status(500).json({
//             message: "Error fetching predictions",
//             error: error.message
//         });
//     }
// };


















const YieldPrediction = require('../models/YieldPrediction');
const axios = require('axios');

exports.saveYieldPrediction = async (req, res) => {
    try {
        const predictionData = req.body;
        
        const requiredFields = ['Crop', 'Season', 'State', 'Area', 
                               'Annual_Rainfall', 'Fertilizer', 
                               'Pesticide', 'Crop_Year'];

        const missingFields = requiredFields.filter(field => !(field in predictionData));

        if (missingFields.length > 0) {
            return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
        }

        // Get prediction from FastAPI
        const fastApiResponse = await axios.post(
            'http://localhost:3000/api/predict-yield',
            predictionData
        );

        const newPrediction = new YieldPrediction({
            ...predictionData,
            Area: parseFloat(predictionData.Area),
            Annual_Rainfall: parseFloat(predictionData.Annual_Rainfall),
            Fertilizer: parseFloat(predictionData.Fertilizer),
            Pesticide: parseFloat(predictionData.Pesticide),
            Crop_Year: parseInt(predictionData.Crop_Year, 10),
            predicted_yield: fastApiResponse.data.predicted_yield
        });

        await newPrediction.save();
        res.status(201).json({ 
            message: "Yield prediction saved successfully",
            data: newPrediction,
            predicted_yield: newPrediction.predicted_yield
        });

    } catch (error) {
        console.error("Error saving prediction:", error);
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.detail || error.message;
        res.status(statusCode).json({ 
            message: "Error saving yield prediction",
            error: errorMessage
        });
    }
};



exports.getAllPredictions = async (req, res) => { // Must match route reference
    try {
      const predictions = await YieldPrediction.find().sort({ createdAt: -1 });
      res.json(predictions);
    } catch (error) {
      res.status(500).json({
        message: "Error fetching predictions",
        error: error.message
      });
    }
  };
  
  