import { createToken } from '../auth/_utils/jwt';
import { sendOtpViaSMS } from '../auth/_utils/sendSMS';

import { database } from '../../../firebase';
import { get, ref } from "firebase/database";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, password, metaUserData } = req.body;

    const usersRef = ref(database, 'users');
    const snapshot = await get(usersRef);
    const userData = snapshot.val()
    const userExists = Object.values(userData).some(user => user.phoneNumber === phoneNumber && user.password === password);
    // console.log("AZAZA snapshot", snapshot.val())
    // console.log("AZAZA userExists", userExists)
    
    const ip = req.connection.remoteAddress;
    metaUserData.ip = ip
    console.log(metaUserData)

    if (userExists) {
      // const phoneNumber = '+380959469876'; // User's phone number
      // const otp = '123456'; // Generated OTP
      // sendOtpViaSMS(phoneNumber, otp);

      const token = createToken({ phoneNumber });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

// Add new user
// const usersRef = ref(database, "users")
// const newUserRef = push(usersRef); // Generates a unique ID for the new user
// set(newUserRef, {
//   phoneNumber: '1222',
//   password: 'password',
// });