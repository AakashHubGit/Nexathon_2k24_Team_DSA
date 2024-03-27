const express = require('express');
const User = require('../models/user')
const Appointment = require('../models/appointment')
const Property = require('../models/property')
const Owner = require('../models/owner')
const fetchuser = require('../middleware/fetchUser')
const fetchOwner = require('../middleware/fetchOwner')
const router = express.Router();

router.post('/addappoint', fetchuser, async (req, res) => {
    const { property, owner, date, time } = req.body;
    const userId = req.user.id;
    const newAppoint = new Appointment({
        user: userId, owner, property, date, time
    })

    await newAppoint.save();
    res.status(200).json({ message: 'Appointment uploaded successfully', property: newAppoint });
})

router.get('/getappoint',fetchOwner, async (req, res) => {
    try {
        const app = await Appointment.find({ owner: req.owner.id });
        res.json(app);
    } catch (error) {
        console.log(error);
        es.status(500).send("Unexpected error occurred ");
    }
})




module.exports = router;