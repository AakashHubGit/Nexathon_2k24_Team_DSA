const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const amenitiesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

const propertySchema = new Schema({
  name: { type: String, required: true },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "owner",
  },

  location: { type: String, required: true },

  price: { type: Number, required: true },

  builder: { type: String, required: true },

  amenities:[amenitiesSchema],

  floorplan: {type: String, required: true},

  features: [String],

  type: {
    type: String,
    enum: ["Apartment", "Villa", "Builder Floor","Duplex","Penthouse","Studio","Townhouse","Mansion","Beach House"],
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
