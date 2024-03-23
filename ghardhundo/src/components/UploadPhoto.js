import React, { useState } from 'react';
import axios from 'axios';

const UploadPhoto = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [builder, setBuilder] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState(''); // Define amenityInput state
  const [floorplan, setFloorplan] = useState('');
  const [features, setFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState(''); // Define featureInput state
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');
  const [size, setSize] = useState('');
  const [area, setArea] = useState('');
  const [places, setPlaces] = useState([]);
  const [placeInput, setPlaceInput] = useState(''); // Define placeInput state

  // Function to add amenity to the amenities array
  const addAmenity = () => {
    if (amenityInput.trim() !== '') {
      setAmenities([...amenities, amenityInput]);
      setAmenityInput(''); // Clear the input field
    }
  };

  // Function to remove amenity from the amenities array
  const removeAmenity = (index) => {
    const newAmenities = [...amenities];
    newAmenities.splice(index, 1);
    setAmenities(newAmenities);
  };

  // Function to add feature to the features array
  const addFeature = () => {
    if (featureInput.trim() !== '') {
      setFeatures([...features, featureInput]);
      setFeatureInput(''); // Clear the input field
    }
  };

  // Function to remove feature from the features array
  const removeFeature = (index) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };

  // Function to add place to the places array
  const addPlace = () => {
    if (placeInput.trim() !== '') {
      setPlaces([...places, placeInput]);
      setPlaceInput(''); // Clear the input field
    }
  };

  // Function to remove place from the places array
  const removePlace = (index) => {
    const newPlaces = [...places];
    newPlaces.splice(index, 1);
    setPlaces(newPlaces);
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('builder', builder);
    formData.append('amenities', JSON.stringify(amenities));
    formData.append('floorplan', floorplan);
    formData.append('features', JSON.stringify(features));
    formData.append('type', type);
    formData.append('status', status);
    formData.append('size', size);
    formData.append('area', area);
    formData.append('places', JSON.stringify(places));

    try {
      const response = await axios.post('http://localhost:5000/api/property/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      // Handle success (e.g., show success message)
    } catch (error) {
      console.error('Error uploading file:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <form onSubmit={onSubmit}>
  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
  <input type="text" value={builder} onChange={(e) => setBuilder(e.target.value)} placeholder="Builder" />

  {/* Input field for amenities */}
  <input type="text" value={amenityInput} onChange={(e) => setAmenityInput(e.target.value)} placeholder="Amenity" />
  <button type="button" onClick={addAmenity}>Add Amenity</button>
  {amenities.map((amenity, index) => (
    <div key={index}>
      <input type="text" value={amenity} readOnly />
      <button type="button" onClick={() => removeAmenity(index)}>Remove</button>
    </div>
  ))}

  <input type="text" value={floorplan} onChange={(e) => setFloorplan(e.target.value)} placeholder="Floorplan" />

  {/* Input field for features */}
  <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} placeholder="Feature" />
  <button type="button" onClick={addFeature}>Add Feature</button>
  {features.map((feature, index) => (
    <div key={index}>
      <input type="text" value={feature} readOnly />
      <button type="button" onClick={() => removeFeature(index)}>Remove</button>
    </div>
  ))}

  <select value={type} onChange={(e) => setType(e.target.value)}>
    <option value="">Select Type</option>
    <option value="Apartment">Apartment</option>
    <option value="Villa">Villa</option>
    <option value="Builder Floor">Builder Floor</option>
    {/* Add other options as needed */}
  </select>

  <select value={status} onChange={(e) => setStatus(e.target.value)}>
    <option value="">Select Status</option>
    <option value="Under Construction">Under Construction</option>
    <option value="Completed">Completed</option>
    <option value="Pre-launch">Pre-launch</option>
  </select>

  <select value={size} onChange={(e) => setSize(e.target.value)}>
    <option value="">Select Size</option>
    <option value="1BHK">1BHK</option>
    <option value="2BHK">2BHK</option>
    <option value="3BHK">3BHK</option>
    {/* Add other options as needed */}
  </select>

  <input type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Area" />

  {/* Input field for places */}
  <input type="text" value={placeInput} onChange={(e) => setPlaceInput(e.target.value)} placeholder="Place" />
  <button type="button" onClick={addPlace}>Add Place</button>
  {places.map((place, index) => (
    <div key={index}>
      <input type="text" value={place} readOnly />
      <button type="button" onClick={() => removePlace(index)}>Remove</button>
    </div>
  ))}

  <input type="file" onChange={onChange} />
  <button type="submit">Upload</button>
</form>

  );
};

export default UploadPhoto;
