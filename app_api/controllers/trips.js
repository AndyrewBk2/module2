const mongoose = require('mongoose');
const Trip = require('../models/travlr'); 
const Model = mongoose.model('trips');


const tripsList = async (req, res) => {
    try {
       
        const trips = await Model.find({}).exec();

        
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found' });
        }

        
        return res.status(200).json(trips);

    } catch (err) {
       
        console.error(err);
        return res.status(500).json({ message: 'An error occurred' });
    }
};


const tripByCode = async (req, res) => {
    try {
        
        const { code } = req.params;

       
        const trip = await Model.findOne({ code }).exec();

       
        if (!trip) {
            return res.status(404).json({ message: `Trip with code ${code} not found` });
        }

        
        return res.status(200).json(trip);

    } catch (err) {
        
        console.error(err);
        return res.status(500).json({ message: 'An error occurred' });
    }
};

module.exports = {
    tripsList,
    tripByCode  // Export the new function
};
