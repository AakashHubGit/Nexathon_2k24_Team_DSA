import React, { useState } from 'react';
import axios from 'axios';
import "../css/RatePred.css"

function RatePred() {
  // Define mappings for region, type, and status
  const regionMappings = {
    0: 'Andheri East',
    1: 'Andheri West',
    2: 'Bandra',
    3: 'Bandra East',
    4: 'Bandra West',
    5: 'Ghatkopar East',
    6: 'Ghatkopar West',
    7: 'Lower Parel',
    8: 'Thane East',
    9: 'Thane West'
  };

  const typeMappings = {
    0: 'Apartment',
    1: 'Independent House',
    2: 'Studio Apartment',
    3: 'Villa'
  };


  // State variables to hold form data
  const [bhk, setBhk] = useState('');
  const [area, setArea] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [predictedValue, setPredictedValue] = useState(null);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Map the selected region, type, and status to their encoded integer values
      const regionLabel = Object.keys(regionMappings).find(key => regionMappings[key] === selectedRegion);
      const typeLabel = Object.keys(typeMappings).find(key => typeMappings[key] === selectedType);

      // Make a POST request to the Flask API with the integer-encoded data
      const response = await axios.post('http://127.0.0.1:5000/ratepred', {
        data: {
          bhk: parseInt(bhk),
          area: parseInt(area),
          region: parseInt(regionLabel),
          type: parseInt(typeLabel)
        }
      });
      console.log(regionLabel);
      // Log the prediction result
      setPredictedValue(response.data.prediction);
      // You can update the state or display the prediction result in the frontend
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="container">
      <h2>Rate Prediction Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">BHK:</label>
          <input type="text" value={bhk} onChange={(e) => setBhk(e.target.value)} className="input-field" />
        </div>
        <div className="form-group">
          <label className="label">Area:</label>
          <input type="text" value={area} onChange={(e) => setArea(e.target.value)} className="input-field" />
        </div>
        <div className="form-group">
          <label className="label">Region:</label>
          <select value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)} className="select-field">
            <option value="">Select Region</option>
            {Object.entries(regionMappings).map(([label, region]) => (
              <option key={label} value={region}>{region}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label">Type:</label>
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="select-field">
            <option value="">Select Type</option>
            {Object.entries(typeMappings).map(([label, type]) => (
              <option key={label} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {predictedValue !== null && (
        <div className="result">
          <h3>Predicted Rate:</h3>
          <p>{predictedValue.toFixed(2)} Lacs</p>
        </div>
      )}
    </div>
  );
}

export default RatePred;
