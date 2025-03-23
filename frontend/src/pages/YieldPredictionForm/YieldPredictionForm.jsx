// import React, { useState } from "react";
// import "./YieldPredictionForm.css";

// const YieldPredictionForm = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     year: new Date().getFullYear(),
//     cropName: "",
//     season: "",
//     state: "",
//     area: "",
//     rainfall: "",
//     fertilizer: "",
//     pesticide: ""
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await fetch("http://localhost:3000/api/predict-yield", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       alert(`Predicted Yield: ${result.predicted_yield.toFixed(2)} kg/ha`);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       alert("Failed to submit form. Please check your inputs and try again.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <button onClick={() => setShowForm(!showForm)} className="toggle-btn">
//         {showForm ? "Hide Form" : "Show Yield Prediction Form"}
//       </button>

//       {showForm && (
//         <div className="form-card">
//           <h1 className="form-title">🌱 Smart Agricultural Yield Prediction</h1>
//           <p className="form-subtitle">Enter your farm details to predict crop yield</p>

//           <form onSubmit={handleSubmit} className="form-grid">
//             {/* Existing form fields remain the same */}
//             <div className="form-group">
//               <label>Year:</label>
//               <input type="number" name="year" className="form-input" 
//                      value={formData.year} onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Crop Name:</label>
//               <input type="text" name="cropName" className="form-input" 
//                      value={formData.cropName} onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Season:</label>
//               <select name="season" className="form-input" 
//                       value={formData.season} onChange={handleChange} required>
//                 <option value="">Select Season</option>
//                 <option value="Kharif">Karif</option>
//                 <option value="Rabi">Rabi</option>
//                 <option value="Zaid">Zaid</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>State:</label>
//               <input type="text" name="state" className="form-input" 
//                      value={formData.state} onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Area (in hectares):</label>
//               <input type="number" name="area" className="form-input" 
//                      value={formData.area} onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Annual Rainfall (mm):</label>
//               <input type="number" name="rainfall" className="form-input" 
//                      value={formData.rainfall} onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Fertilizer (kg/ha):</label>
//               <input type="number" name="fertilizer" className="form-input" 
//                      value={formData.fertilizer} onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Pesticide (L/ha):</label>
//               <input type="number" name="pesticide" className="form-input" 
//                      value={formData.pesticide} onChange={handleChange} required />
//             </div>

//             <div className="form-buttons">
//               <button type="submit" className="btn-submit">Predict Yield</button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YieldPredictionForm;
// import React, { useState } from "react";
// import "./YieldPredictionForm.css";

// const YieldPredictionForm = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     Crop: "",
//     Season: "",
//     State: "",
//     Area: "",
//     Annual_Rainfall: "",
//     Fertilizer: "",
//     Pesticide: "",
//     Crop_Year: new Date().getFullYear()
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const payload = {
//         ...formData,
//         Area: parseFloat(formData.Area),
//         Annual_Rainfall: parseFloat(formData.Annual_Rainfall),
//         Fertilizer: parseFloat(formData.Fertilizer),
//         Pesticide: parseFloat(formData.Pesticide),
//         Crop_Year: parseInt(formData.Crop_Year, 10)
//       };

//       const response = await fetch("http://localhost:3000/api/predict-yield", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
//       const result = await response.json();
//       alert(`Predicted Yield: ${result.predicted_yield.toFixed(2)} kg/ha`);
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to get prediction. Check inputs and try again.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <button onClick={() => setShowForm(!showForm)} className="toggle-btn">
//         {showForm ? "Hide Form" : "Show Yield Prediction Form"}
//       </button>

//       {showForm && (
//         <div className="form-card">
//           <h1 className="form-title">🌱 Smart Agricultural Yield Prediction</h1>
          
//           <form onSubmit={handleSubmit} className="form-grid">
//             <div className="form-group">
//               <label>Crop Name:</label>
//               <input type="text" name="Crop" value={formData.Crop} 
//                      onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Season:</label>
//               <select name="Season" value={formData.Season} onChange={handleChange} required>
//                 <option value="">Select Season</option>
//                 <option value="Karif">Karif</option>
//                 <option value="Rabi">Rabi</option>
//                 <option value="Zaid">Zaid</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>State:</label>
//               <input type="text" name="State" value={formData.State} 
//                      onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Crop Year:</label>
//               <input type="number" name="Crop_Year" value={formData.Crop_Year} 
//                      onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Area (hectares):</label>
//               <input type="number" name="Area" value={formData.Area} 
//                      onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Annual Rainfall (mm):</label>
//               <input type="number" name="Annual_Rainfall" value={formData.Annual_Rainfall} 
//                      onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Fertilizer (kg/ha):</label>
//               <input type="number" name="Fertilizer" value={formData.Fertilizer} 
//                      onChange={handleChange} required />
//             </div>

//             <div className="form-group">
//               <label>Pesticide (L/ha):</label>
//               <input type="number" name="Pesticide" value={formData.Pesticide} 
//                      onChange={handleChange} required />
//             </div>

//             <button type="submit" className="btn-submit">Predict Yield</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YieldPredictionForm;
// import React, { useState } from "react";
// import "./YieldPredictionForm.css";

// const YieldPredictionForm = () => {
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     Crop: "",
//     Season: "",
//     State: "",
//     Area: "",
//     Annual_Rainfall: "",
//     Fertilizer: "",
//     Pesticide: "",
//     Crop_Year: new Date().getFullYear()
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const payload = {
//         ...formData,
//         Area: parseFloat(formData.Area),
//         Annual_Rainfall: parseFloat(formData.Annual_Rainfall),
//         Fertilizer: parseFloat(formData.Fertilizer),
//         Pesticide: parseFloat(formData.Pesticide),
//         Crop_Year: parseInt(formData.Crop_Year, 10)
//       };

//       const response = await fetch("http://localhost:3000/api/predict-yield", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
//       const result = await response.json();
//       alert(`Predicted Yield: ${result.predicted_yield.toFixed(2)} kg/ha`);
//     } catch (error) {
//       console.error("Submission error:", error);
//       alert("Failed to get prediction. Check inputs and try again.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <button onClick={() => setShowForm(!showForm)} className="toggle-btn">
//         {showForm ? "Hide Form" : "Show Yield Prediction Form"}
//       </button>

//       {showForm && (
//         <div className="form-card">
//           <h1 className="form-title">🌱 Smart Agricultural Yield Prediction</h1>
          
//           <form onSubmit={handleSubmit} className="form-grid">
//             <div className="form-group">
//               <label>Crop Name:</label>
//               <input
//                 type="text"
//                 name="Crop"
//                 className="form-input"
//                 value={formData.Crop}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Season:</label>
//               <select
//                 name="Season"
//                 className="form-input"
//                 value={formData.Season}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="">Select Season</option>
//                 <option value="Kharif">Kharif</option>
//                 <option value="Rabi">Rabi</option>
//                 <option value="Zaid">Zaid</option>
//               </select>
//             </div>

//             <div className="form-group">
//               <label>State:</label>
//               <input
//                 type="text"
//                 name="State"
//                 className="form-input"
//                 value={formData.State}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Crop Year:</label>
//               <input
//                 type="number"
//                 name="Crop_Year"
//                 className="form-input"
//                 value={formData.Crop_Year}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Area (hectares):</label>
//               <input
//                 type="number"
//                 name="Area"
//                 className="form-input"
//                 value={formData.Area}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Annual Rainfall (mm):</label>
//               <input
//                 type="number"
//                 name="Annual_Rainfall"
//                 className="form-input"
//                 value={formData.Annual_Rainfall}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Fertilizer (kg/ha):</label>
//               <input
//                 type="number"
//                 name="Fertilizer"
//                 className="form-input"
//                 value={formData.Fertilizer}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label>Pesticide (L/ha):</label>
//               <input
//                 type="number"
//                 name="Pesticide"
//                 className="form-input"
//                 value={formData.Pesticide}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             <button type="submit" className="btn-submit">Predict Yield</button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default YieldPredictionForm;
import React, { useState } from "react";
import "./YieldPredictionForm.css";

const YieldPredictionForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    Crop: "",
    Season: "",
    State: "",
    Area: "",
    Annual_Rainfall: "",
    Fertilizer: "",
    Pesticide: "",
    Crop_Year: new Date().getFullYear()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const numericFields = ['Area', 'Annual_Rainfall', 'Fertilizer', 'Pesticide', 'Crop_Year'];
    
    // Check required fields
    if (!formData.Crop || !formData.Season || !formData.State) {
      setError("Please fill in all required fields");
      return false;
    }

    // Validate numeric fields
    for (const field of numericFields) {
      if (isNaN(formData[field]) || formData[field] === "") {
        setError(`Please enter a valid number for ${field.replace('_', ' ')}`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
        const payload = {
            ...formData,
            Area: parseFloat(formData.Area),
            Annual_Rainfall: parseFloat(formData.Annual_Rainfall),
            Fertilizer: parseFloat(formData.Fertilizer),
            Pesticide: parseFloat(formData.Pesticide),
            Crop_Year: parseInt(formData.Crop_Year, 10),
            predicted_yield: 0  // Default value, should be calculated by your ML model
        };

        const response = await fetch("http://localhost:5000/api/yield/save-prediction", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Prediction failed");
        }

        const result = await response.json();
        alert(`Prediction saved successfully!`);
        setShowForm(false);
    } catch (error) {
        console.error("Submission error:", error);
        setError(error.message || "Failed to save prediction.");
    } finally {
        setLoading(false);
    }
};

  

  return (
    <div className="form-container">
      <button 
        onClick={() => setShowForm(!showForm)} 
        className="toggle-btn"
        disabled={loading}
      >
        {showForm ? "Hide Form" : "Show Yield Prediction Form"}
      </button>

      {showForm && (
        <div className="form-card">
          <h1 className="form-title">🌱 Smart Agricultural Yield Prediction</h1>
          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="form-grid">
            {/* Crop Name Input */}
            <div className="form-group">
              <label>Crop Name:</label>
              <input
                type="text"
                name="Crop"
                className="form-input"
                value={formData.Crop}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Season Selection */}
            <div className="form-group">
              <label>Season:</label>
              <select
                name="Season"
                className="form-input"
                value={formData.Season}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select Season</option>
                <option value="Kharif">Kharif</option>
                <option value="Rabi">Rabi</option>
                <option value="Zaid">Zaid</option>
              </select>
            </div>

            {/* State Input */}
            <div className="form-group">
              <label>State:</label>
              <input
                type="text"
                name="State"
                className="form-input"
                value={formData.State}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Crop Year Input */}
            <div className="form-group">
              <label>Crop Year:</label>
              <input
                type="number"
                name="Crop_Year"
                className="form-input"
                value={formData.Crop_Year}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Area Input */}
            <div className="form-group">
              <label>Area (hectares):</label>
              <input
                type="number"
                name="Area"
                className="form-input"
                value={formData.Area}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Annual Rainfall Input */}
            <div className="form-group">
              <label>Annual Rainfall (mm):</label>
              <input
                type="number"
                name="Annual_Rainfall"
                className="form-input"
                value={formData.Annual_Rainfall}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Fertilizer Input */}
            <div className="form-group">
              <label>Fertilizer (kg/ha):</label>
              <input
                type="number"
                name="Fertilizer"
                className="form-input"
                value={formData.Fertilizer}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Pesticide Input */}
            <div className="form-group">
              <label>Pesticide (L/ha):</label>
              <input
                type="number"
                name="Pesticide"
                className="form-input"
                value={formData.Pesticide}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Predicting...
                </>
              ) : "Predict Yield"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default YieldPredictionForm;