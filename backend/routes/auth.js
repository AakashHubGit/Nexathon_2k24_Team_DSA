require('dotenv').config()
const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
var jwt = require("jsonwebtoken");
const fetchuser = require('../middleware/fetchUser');
const Owner = require('../models/owner');
const fetchowner = require('../middleware/fetchOwner');
const router = express.Router();
const url = process.env.BASE_URL



//Route 1
router.post('/createuser', [
    // Validating User Details
    body('name', 'Username: minimum 3 characters').isLength({ min: 3 }),
    body('password', 'Password: minimum 6 characters').isLength({ min: 6 }),
], async (req, res) => {
    let success = false;
    //If there are errors , return bad requests and also errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Check if the email already exists
    try {
        let user = await User.findOne({ name: req.body.name });
        if (user) {
            return res.status(400).json({ error: 'This Username is already in use' })
        }
        const salt = await bcrypt.genSalt(10);

        secPass = await bcrypt.hash(req.body.password, salt);
        //Create User
        user = await User.create({
            name: req.body.name,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        // res.json(user)
        res.json({ success, authToken: authToken });
    }
    //Display Errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occurred ");
    }
});


//Route 2
//Authenticate a user
router.post('/loginuser', [
    //Validating User Details
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    let success = false;
    //If there are errors , return bad requests and also errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, password } = req.body;
    try {
        let user = await User.findOne({ name });
        if (!user) {
            return res.status(400).json({ success, error: "Wrong Credentials" });
        }

        const passCompare = await bcrypt.compare(password, user.password);
        if (!passCompare) {
            success = false;
            return res.status(400).json({ success, error: "Wrong Credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occurred ");
    }

})

//Route 3
//Get Loggedin User credentials
router.get('/getuser', fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occurred ");
    }
});



//Route 4
router.post('/createowner', [
    // Validating User Details
    body('email', 'Enter a valid e-mail').isEmail(),
    body('phone', 'Enter a valid phone number').isLength({ min: 10 }),
    body('name', 'Username: minimum 3 characters').isLength({ min: 3 }),
    body('password', 'Password: minimum 6 characters').isLength({ min: 6 }),
], async (req, res) => {
    let success = false;
    //If there are errors , return bad requests and also errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    //Check if the email already exists
    try {
        let owner = await Owner.findOne({ name: req.body.email });
        if (owner) {
            return res.status(400).json({ error: 'This Email is already in use' })
        }
        const salt = await bcrypt.genSalt(10);

        secPass = await bcrypt.hash(req.body.password, salt);
        //Create User
        owner = await Owner.create({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: secPass
        })
        const data = {
            owner: {
                id: owner.id
            }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        // res.json(user)
        res.json({ success, authToken: authToken });
    }
    //Display Errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occurred ");
    }
});

//Route 5
//Authenticate a Owner
router.post('/loginowner', [
    //Validating User Details
    body('email', 'Enter a valid e-mail').isEmail(),
    body('password', 'Password cannot be empty').exists()
], async (req, res) => {
    let success = false;
    //If there are errors , return bad requests and also errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let owner = await Owner.findOne({ email });
        if (!owner) {
            return res.status(400).json({ success, error: "Email Doesn't Exist" });
        }

        const passCompare = await bcrypt.compare(password, owner.password);
        if (!passCompare) {
            success = false;
            return res.status(400).json({ success, error: "Wrong Credentials" })
        }
        const data = {
            owner: {
                id: owner.id
            }
        }
        const authtoken = jwt.sign(data, process.env.JWT_SECRET);
        success = true;
        res.json({ success, authtoken });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occurred ");
    }

});


//Route 6
//Get Loggedin Owner credentials
router.get('/getowner', fetchowner, async (req, res) => {
    try {
        ownerId = req.owner.id;
        const owner = await Owner.findById(ownerId).select("-password")
        res.send(owner);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occurred ");
    }
});

router.get('/getowner/:id', async (req, res) => {
    try {
        const id = req.params.id
        const owner = await Owner.find({ _id: id }).select("-password")
        res.send(owner);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Unexpected error occurred ");
    }
});


module.exports = router
