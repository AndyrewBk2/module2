const mongoose = require('mongoose');
const Trip = require('./travlr');
const fs = require('fs');

// Load trips data from JSON file
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Seed the database
const seedDB = async () => {
  try {
    // Clear existing trips
    await Trip.deleteMany({});

    // Insert new trips data
    await Trip.insertMany(trips);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();
      console.log('Mongoose connection closed.');
    } else {
      console.log('Mongoose connection not open, skipping close.');
    }
    process.exit(0);
  }
};

seedDB();
