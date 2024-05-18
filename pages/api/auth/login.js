import { createToken } from '../auth/_utils/jwt';
import { sendOtpViaSMS } from '../auth/_utils/sendSMS';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    // if (username === 'admin' && password === 'password') {
    if (true) {

      // const phoneNumber = '+380959469876'; // User's phone number
      // const otp = '123456'; // Generated OTP
      // sendOtpViaSMS(phoneNumber, otp);

      const token = createToken({ username });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}