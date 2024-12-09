const mongoose = require('mongoose');
const readLine = require('readline');
const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = `mongodb://${host}/travlr`;

const connect = () => {
  
  mongoose.connect(dbURI)
    .then(() => {
      console.log(`Mongoose connected to ${dbURI}`);
    })
    .catch((err) => {
      console.log('Mongoose connection error: ', err);
      setTimeout(connect, 30000);
    });
};


mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection error: ', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});


if (process.platform === 'win32') {
  const r1 = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  r1.on('SIGINT', () => {
    process.emit('SIGINT');
  });
}


const gracefulShutdown = (msg) => {
  mongoose.connection.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    process.exit(0);  // Exit after disconnection
  });
};


process.on('SIGINT', () => gracefulShutdown('app termination (SIGINT)'));
process.on('SIGTERM', () => gracefulShutdown('app termination (SIGTERM)'));


connect();
