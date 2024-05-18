const twilio = require('twilio');

const client = twilio(process.env.twilioAccountSid, process.env.twilioAuthToken);

export const sendOtpViaSMS = async (phoneNumber, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: process.env.twilioPhone,
      to: phoneNumber
    });
    console.log('OTP SMS sent:', message.sid);
  } catch (error) {
    console.error('Error sending OTP SMS:', error);
  }
};