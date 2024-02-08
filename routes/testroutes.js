const express = require('express');
const router = express.Router();
const TestRoute = require('../models/testroute');

// Handling GET request to '/'
router.get('/', async (req, res) => {
    try {
        // sabai fetch garxa
        const testroutes = await TestRoute.find();
        // testroute lai json response dinxa
        res.json(testroutes);
    } catch (err) {
        // error handle garxa
        res.status(500).json({ message: err.message });
    }
});

// Handling GET request to '/:id'
router.get('/:id', getTestRoute, (req, res) => {
    // name bapas dinxa testroute ko databatw
    res.json(res.testroute.name);
});

// Handling POST request to '/'
router.post('/', async (req, res) => {
    // name and email are extracted
    const { name, email } = req.body;
    // Creating a new TestRoute instance
    const newTestRoute = new TestRoute({
        name: name,
        email: email
    });
    try {
        // Saving the new testroute to the database
        const savedTestRoute = await newTestRoute.save();
        // Responding with the saved testroute
        res.status(201).json(savedTestRoute);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Handling PATCH request to '/:id'
router.patch('/:id', getTestRoute, async (req, res) => {
    // Update the testroute's name and email if provided in the request body
    if (req.body.name !== undefined) {
        res.testroute.name = req.body.name;
    }
    if (req.body.email !== undefined) {
        res.testroute.email = req.body.email;
    }
    try {
        const updatedTestRoute = await res.testroute.save();
        res.json(updatedTestRoute);
    } catch(err) {
        // Handle validation errors
        res.status(400).json({ message: err.message });
    }
});

// Handling DELETE request to '/:id'
router.delete('/:id', getTestRoute, async (req, res) => {
    try {
        // Delete the testroute
        await res.testroute.deleteOne();
        // Respond with success message
        res.json({ message: 'Deleted' });
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get the requested testroute
async function getTestRoute(req, res, next){
    let testroute
    try{
        // Find the testroute by ID
        testroute = await TestRoute.findById(req.params.id);
        // If no testroute found, return 404 error
        if(testroute == null){
            return res.status(404).json({message:'No such user'})
        }
    } catch (err) {
        // Handle database errors
        return res.status(500).json({ message: err.message});
    }
    // Set the testroute in the response object and call next middleware
    res.testroute=testroute
    next()
}

module.exports = router;
