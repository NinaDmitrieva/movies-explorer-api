require('dotenv').config();

const {
  mongodbURL = 'mongodb://localhost:27017/moviesdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  mongodbURL, PORT, NODE_ENV, JWT_SECRET,
};
