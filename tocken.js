require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = async ({ id, email }) => {
  return await jwt.sign({ id, email }, process.env.Seceret_key, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
