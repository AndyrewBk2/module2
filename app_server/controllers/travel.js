var fs = require('fs');


var trips;
try {
    trips = JSON.parse(fs.readFileSync('.data/trips.json', 'utf8'));
} catch (err) {
    console.error("Error reading trips.json: ", err);
    trips = []; 
}

/* GET travel view */
const travel = (req, res) => {
    res.render('travel', {
        title: 'Travlr Getaways', 
        trips: trips  
    });
};

module.exports = {
    travel
};
