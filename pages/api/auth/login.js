import { createToken } from '../auth/_utils/jwt';
import { sendOtpViaSMS } from '../auth/_utils/sendSMS';

import { database } from '../../../firebase';
import { get, ref, update } from "firebase/database";
import { isEqualObj } from './_utils/isEqualObj';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, password, metaUserData } = req.body;

    // Get whether user exists in DB
    const getUsersRef = ref(database, 'users');
    const usersData = (await get(getUsersRef)).val();
    const userId = Object.keys(usersData).find(userId => {
      const user = usersData[userId];
      return user.phoneNumber === phoneNumber && user.password === password;
    });  
    const userDataDB = userId ? usersData[userId] : null;
    
    if (userId) {
      // Update metaUserData
      const ip = req.connection.remoteAddress;
      metaUserData.ip = ip
      metaUserData.phoneNumber = phoneNumber
      metaUserData.password = password
      const updateUserRef = ref(database, `users/${userId}`);
      update(updateUserRef, metaUserData);

      const isMetaSame = isEqualObj(userDataDB, metaUserData)

      if(!isMetaSame) {
        console.log("AZAZA send otp")
        // const phoneNumber = '+380959469876'; // User's phone number
        // const otp = '123456'; // Generated OTP
        // sendOtpViaSMS(phoneNumber, otp);
      }

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