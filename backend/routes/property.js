const express = require('express');
const multer = require('multer');
const path = require('path');
const Property = require('../models/property');

const router = express.Router();

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('file');

router.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error uploading file' });
    } else {
      const { name, location, price, builder, amenities, floorplan, features, type, status, size, area, places } = req.body;

      const property = new Property({
        name,
        location,
        price,
        builder,
        amenities: [{ name: req.body.amenities }],
        floorplan,
        features: JSON.parse(features),
        type,
        status,
        size,
        area,
        places: JSON.parse(places),
        filePath: req.file.path
      });

      property.save()
        .then(() => res.status(200).json({ message: 'File uploaded and data saved successfully' }))
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'Error saving data to database' });
        });
    }
  });
});

module.exports = router;
