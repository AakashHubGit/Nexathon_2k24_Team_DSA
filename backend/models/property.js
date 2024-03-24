const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const propertySchema = new Schema({
  name: { type: String, required: true },

  filePath: { type: String, required: true },

  owner: {
    type: String,
    required: true,
  },

  location: { type: String, required: true },

  price: { type: Number, required: true },

  builder: { type: String, required: true },
  report: { type: String, required: false },
  amenities: {type: [String], required: true},

  floorplan: {type: String, required: true},

  features: {type: [String], required: true},

  type: {
    type: String,
    enum: ["Apartment", "Villa", "Builder Floor","Duplex","Penthouse","Studio","Townhouse","Mansion","Beach House", "Cottage"],
    required: true,
  },

  status: {
    type: String,
    enum: ["Under Construction", "Completed", "Pre-launch"],
    required: true,
  },

  size: {
    type: String,
    enum: ["1BHK", "2BHK", "3BHK", "4BHK", "5BHK"],
    required: true,
  },

  area: { type: Number, required: true },

  places: { type: [String], required: false },

});

const Property = mongoose.model("property", propertySchema);

module.exports = Property;
