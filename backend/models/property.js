const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reportSchema = new Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user'
  // },
  report: {
    type: String,
    required: true
  }
})

const propertySchema = new Schema({
  name: { type: String, required: true },

  filePath: { type: String, required: true },

  location: { type: String, required: true },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'owner',
  //   required: false
  // },
  price: {
    type: Number,
    required: true
  },
  price_unit: {
    type: String,
    required: false
  },
  interested: {
    type: Number,
    required: false,
    default: 0
  },
  builder: { type: String, required: true },
  report: {
    type: [String],
    required: true
  },
  amenities: { type: [String], required: true },

  floorplan: { type: String, required: false },

  features: { type: [String], required: true },

  type: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  size: {
    type: String,
    required: true,
  },

  area: { type: Number, required: true },

  places: { type: [String], required: false },

});

const Property = mongoose.model("property", propertySchema);

module.exports = Property;
