import { verifyToken } from './_utils/jwt';

export default function handler(req, res) {
  const token = req.headers.authorization;

  if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
      res.status(200).json({ message: 'Token is valid' });
    } else {
      res.status(401).json({ message: 'Invalid token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
}
