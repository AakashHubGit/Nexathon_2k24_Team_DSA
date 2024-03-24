  const express = require('express');
  const multer = require('multer');
  const Property = require('../models/property'); // Assuming you have a model for Property

  const router = express.Router();

  // Multer storage configuration for handling file uploads
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Destination folder where uploaded images will be stored
    },
    filename: function (req, file, cb) {
      // Generating a unique filename for each uploaded image
      cb(null, Date.now() + '-' + file.originalname);
    }
  });


  const upload = multer({ storage: storage });

  // POST endpoint for uploading an image and property data
  router.post('/upload-property', upload.single('image'), async (req, res) => {
    try {
      // Extracting property data from request body
      const { name, owner, location, price, builder, amenities, floorplan, features, type, status, size, area, places } = req.body;
      console.log(req.body);
      // Creating a new Property instance with the received data
      const newProperty = new Property({
        name,
        filePath: "/path", // Path to the uploaded image file
        owner,
        location,
        price,
        builder,
        amenities,
        floorplan,
        features,
        type,
        status,
        size,
        area,
        places
      });

      // Saving the new Property to the database
      await newProperty.save();

      res.status(201).json({ message: 'Property uploaded successfully', property: newProperty });
    } catch (error) {
      console.error('Error uploading property:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.get('/properties', async (req, res) => {
    try {
      const properties = await Property.find();
      res.json({ properties });
    } catch (error) {
      console.error('Error fetching properties:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  module.exports = router;
