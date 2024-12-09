const mongoose = require('mongoose');

const MONG_URI = 'mongodb://localhost:27017/lab_Iek6';

mongoose.connect(MONG_URI)
  .then(() => console.log(`Connection is successful to ${MONG_URI}`))
  .catch((err) => console.log(`Error occurred: ${err}`));

const db = mongoose.connection;

db.on('error', (err) => {
  console.log('Error occurred:', err);
});

module.exports = db;