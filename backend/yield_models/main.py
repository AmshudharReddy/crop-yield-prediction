# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import joblib
# import pandas as pd
# import numpy as np

# # Initialize FastAPI app
# app = FastAPI()

# # Load the saved model, scaler, label encoders, and feature names
# rf_model = joblib.load('random_forest_model.pkl')
# scaler = joblib.load('scaler.pkl')
# label_encoders = joblib.load('label_encoders.pkl')
# feature_names = joblib.load('feature_names.pkl')  # Load feature order

# # Define the input data model using Pydantic
# class InputData(BaseModel):
#     Crop: str
#     Season: str
#     State: str
#     Area: float
#     Annual_Rainfall: float
#     Fertilizer: float
#     Pesticide: float
#     Crop_Year: int

# # Define the prediction endpoint
# @app.post("/predict")
# def predict(input_data: InputData):
#     try:
#         # Convert input data to DataFrame
#         input_dict = input_data.dict()
#         input_df = pd.DataFrame([input_dict])

#         # Reorder columns to match training feature order
#         input_df = input_df[feature_names]

#         # Handle unknown categories
#         categorical_columns = ['Crop', 'Season', 'State']
#         for col in categorical_columns:
#             le = label_encoders[col]
#             valid_categories = set(le.classes_)
#             current_value = input_df[col].iloc[0]
            
#             # Replace unknown categories with the first valid category
#             if current_value not in valid_categories:
#                 print(f"Warning: Unknown category '{current_value}' in column '{col}'. Using default: '{le.classes_[0]}'")
#                 input_df[col] = le.classes_[0]

#         # Encode categorical variables
#         for col in categorical_columns:
#             le = label_encoders[col]
#             input_df[col] = le.transform(input_df[col])

#         # Scale features
#         input_scaled = scaler.transform(input_df)

#         # Make prediction
#         prediction = rf_model.predict(input_scaled)

#         return {"predicted_yield": float(prediction[0])}

#     except Exception as e:
#         raise HTTPException(status_code=400, detail=str(e))

# # Run the server
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=3000)
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
import joblib
import pandas as pd
import numpy as np
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB configuration
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "plant_disease_detection"
COLLECTION_NAME = "yeild"

# Initialize MongoDB connection
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(MONGO_URL)
    app.mongodb = app.mongodb_client[DB_NAME]

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()

# Load ML artifacts
rf_model = joblib.load('random_forest_model1.pkl')
scaler = joblib.load('scaler1.pkl')
label_encoders = joblib.load('label_encoders1.pkl')
feature_names = joblib.load('feature_names.pkl')

# Input data model with field aliases
class InputData(BaseModel):
    cropName: str = Field(..., alias="Crop")
    season: str = Field(..., alias="Season")
    state: str = Field(..., alias="State")
    area: float = Field(..., alias="Area")
    rainfall: float = Field(..., alias="Annual_Rainfall")
    fertilizer: float = Field(..., alias="Fertilizer")
    pesticide: float = Field(..., alias="Pesticide")
    year: int = Field(..., alias="Crop_Year")

    class Config:
        allow_population_by_field_name = True

# Prediction endpoint
@app.post("/api/predict-yield")
async def predict(input_data: InputData):
    try:
        # Convert input data to DataFrame
        input_dict = input_data.dict(by_alias=True)
        input_df = pd.DataFrame([input_dict])

        # Reorder columns to match training feature order
        input_df = input_df[feature_names]

        # Handle unknown categories
        categorical_columns = ['Crop', 'Season', 'State']
        for col in categorical_columns:
            le = label_encoders[col]
            current_value = input_df[col].iloc[0]
            if current_value not in le.classes_:
                default_value = le.classes_[0]
                print(f"Warning: Unknown category '{current_value}' in column '{col}'. Using default: '{default_value}'")
                input_df[col] = default_value

        # Encode categorical variables
        for col in categorical_columns:
            le = label_encoders[col]
            input_df[col] = le.transform(input_df[col])

        # Scale features
        input_scaled = scaler.transform(input_df)

        # Make prediction
        prediction = rf_model.predict(input_scaled)
        predicted_yield = float(prediction[0])

        # Prepare document for MongoDB
        document = input_data.dict(by_alias=True)
        document["predicted_yield"] = predicted_yield

        # Save to database
        collection = app.mongodb[COLLECTION_NAME]
        await collection.insert_one(document)

        return {"predicted_yield": predicted_yield}

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000)