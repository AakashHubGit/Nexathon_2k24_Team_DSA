import React, { useState } from 'react';
import "../css/PropertyForm.css"

const PropertyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    image: null,
    owner: '',
    location: '',
    floorplan: '',
    price: '',
    builder: '',
    amenities: [],
    features: [],
    type: '',
    status: '',
    size: '',
    area: '',
    places: []
  });

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData(prevState => ({
        ...prevState,
        image: e.target.files[0]
      }));
    } else {
      const { name, value } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleAmenitiesChange = (e, index) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index] = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      amenities: newAmenities
    }));
  };

  const handleFeaturesChange = (e, index) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      features: newFeatures
    }));
  };

  const handlePlacesChange = (e, index) => {
    const newPlaces = [...formData.places];
    newPlaces[index] = e.target.value;
    setFormData(prevState => ({
      ...prevState,
      places: newPlaces
    }));
  };

  const handleAddField = (field) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: [...prevState[field], '']
    }));
  };

  const handleRemoveField = (field, index) => {
    const newFields = [...formData[field]];
    newFields.splice(index, 1);
    setFormData(prevState => ({
      ...prevState,
      [field]: newFields
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => formDataToSend.append(key, item));
      } else {
        formDataToSend.append(key, value);
      }
    });
    try {
      const response = await fetch('http://localhost:3001/api/property/upload-property', {
        method: 'POST',
        body: formDataToSend
      });
      if (response.ok) {
        console.log('Property uploaded successfully!');
        // Optionally, you can reset the form here
      } else {
        console.error('Failed to upload property');
      }
    } catch (error) {
      console.error('Error uploading property:', error);
    }
  };
  return (
    <form className="property-form" onSubmit={handleSubmit}>
      <div className="form-gorup">

      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Image:
        <input type="file" name="image" onChange={handleChange} accept="image/*" required />
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Location:
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Floor Plan:
        <input type="text" name="floorplan" value={formData.floorplan} onChange={handleChange} required />
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Price:
        <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Builder:
        <input type="text" name="builder" value={formData.builder} onChange={handleChange} required />
      </label>
      </div>
      <div className="form-gorup">

      <label>Amenities:</label>
      {formData.amenities.map((amenity, index) => (
        <div key={index}>
          <input
            type="text"
            value={amenity}
            onChange={(e) => handleAmenitiesChange(e, index)}
            required
          />
          <button type="button" onClick={() => handleRemoveField('amenities', index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('amenities')}>Add Amenity</button>
      </div>
      <div className="form-gorup">

      <label>Features:</label>
      {formData.features.map((feature, index) => (
        <div key={index}>
          <input
            type="text"
            value={feature}
            onChange={(e) => handleFeaturesChange(e, index)}
            required
            />
          <button type="button" onClick={() => handleRemoveField('features', index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('features')}>Add Feature</button>
      </div>
      <div className="form-gorup">

      <label>Places:</label>
      {formData.places.map((place, index) => (
        <div key={index}>
          <input
            type="text"
            value={place}
            onChange={(e) => handlePlacesChange(e, index)}
            />
          <button type="button" onClick={() => handleRemoveField('places', index)}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={() => handleAddField('places')}>Add Place</button>
      </div>
      <div className="form-gorup">
        
      <label>
        Type:
        <select name="type" value={formData.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Builder Floor">Builder Floor</option>
          <option value="Duplex">Duplex</option>
          <option value="Penthouse">Penthouse</option>
          <option value="Studio">Studio</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Mansion">Mansion</option>
          <option value="Beach House">Beach House</option>
        </select>
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Status:
        <select name="status" value={formData.status} onChange={handleChange} required>
          <option value="">Select Status</option>
          <option value="Under Construction">Under Construction</option>
          <option value="Completed">Completed</option>
          <option value="Pre-launch">Pre-launch</option>
        </select>
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Size:
        <select name="size" value={formData.size} onChange={handleChange} required>
          <option value="">Select Size</option>
          <option value="1BHK">1BHK</option>
          <option value="2BHK">2BHK</option>
          <option value="3BHK">3BHK</option>
          <option value="4BHK">4BHK</option>
          <option value="5BHK">5BHK</option>
        </select>
      </label>
      </div>
      <div className="form-gorup">

      <label>
        Area:
        <input type="number" name="area" value={formData.area} onChange={handleChange} required />
      </label>
      </div>

      <div className="form-group">
    <button type="submit">Submit</button>
  </div>
    </form>
  );
};

export default PropertyForm;