const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const user = require('./route/user');
const pet = require('./route/pet');
const { dbConnect } = require('./DB/connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors());

try {
  dbConnect();
} catch (err) {
  console.log(err);
}

app.use('/users', user);
app.use('/pets', pet);

app.use((_err, _req, res) => {
  res.status(500).json({
    message: 'server error',
  });
});

app.listen(3000, () => { console.log('running on port 3000'); });
