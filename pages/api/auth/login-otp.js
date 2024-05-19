import { createToken } from '../auth/_utils/jwt';

import { database } from '../../../firebase';
import { get, ref } from "firebase/database";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { phoneNumber, password, otp } = req.body;

    // Get whether user exists in DB
    const getUsersRef = ref(database, 'users');
    const usersData = (await get(getUsersRef)).val();
    const userId = Object.keys(usersData).find(userId => {
      const user = usersData[userId];
      return user.phoneNumber === phoneNumber && user.password === password;
    });  
    const userDataDB = userId ? usersData[userId] : null;
    
    const isOtpSame = userDataDB.otp === Number(otp)
    if (userId && isOtpSame) {
      const token = createToken({ phoneNumber });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}