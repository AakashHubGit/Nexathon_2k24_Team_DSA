const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
},
property:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property',
},
owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'owner',
},
date:{
    type: String,
    required: true
},
time:{
    type: String,
    required: true
},

});

const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;