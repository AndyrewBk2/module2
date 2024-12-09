const fetch = require('node-fetch');


const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',  // Use GET to fetch data
    headers: {
        'Accept': 'application/json'
    }
};


const travel = async (req, res) => {
    try {
        // Fetch the trips data from the API
        const response = await fetch(tripsEndpoint, options);

        
        if (response.ok) {
            const trips = await response.json();  

            
            if (!trips || trips.length === 0) {
                return res.status(404).json({ message: 'No trips found' });
            }

           
            return res.render('travel', { title: 'Travlr Getaways', trips });
        } else {
            
            return res.status(response.status).json({ message: 'Failed to retrieve trips data' });
        }
    } catch (err) {
        
        console.error('Error fetching data:', err);
        return res.status(500).json({ message: 'An error occurred while fetching trips' });
    }
};

module.exports = {
    travel
};
