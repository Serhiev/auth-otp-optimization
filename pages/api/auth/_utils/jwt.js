const jwt = require('jsonwebtoken');

const secretKey = 'your-secret-key'; // Зберігайте цей ключ в безпеці

const createToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, secretKey, { expiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

module.exports = { createToken, verifyToken };
