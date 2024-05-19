import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import Head from "next/head";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function Login() {
  const { login, loginOTP, needOTP } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const phone_number = form.elements[0].value;
    const password = form.elements[1].value;
    const otp = form.elements[2].value;

    form.elements.length === 3 ? login(phone_number, password) : loginOTP(phone_number, password, otp)
  };

  return (
    <>
      <Head>
        <title>Auth Portal - Log in</title>
      </Head>
      <div className='pt-28 pb-12'>
        <div className='custom-screen text-gray-600'>
          <div className='max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none'>
            <div className='max-w-lg sm:text-center lg:text-left'>
              <h1 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                How our auth works?
              </h1>
              <p className='mt-3'>
                At our authentication system, we offer you the highest level of security and convenience.<br /><br />
                Upon the first login to the user account, the system automatically requests a One-Time Password (OTP) for two-factor authentication, providing an additional layer of protection. <br /><br />
                For your security, we store unique data such as your geolocation, device, and IP address. With each subsequent login, the system automatically compares your stored data with the new ones, and if they haven't changed, OTP won't be required, allowing you to access your account faster and more conveniently. However, if any of these unique characteristics detect changes, you'll receive an OTP request to confirm your identity. This ensures a high level of security and protection for your account.
              </p>
            </div>
            <div className='flex-1 mt-12 sm:max-w-lg lg:max-w-md lg:mt-0'>
              <form
                onSubmit={handleSubmit}
                className='space-y-5 font-medium'>
                <div>
                  <label>Phone number</label>
                  <Input
                    aria-label='Tel'
                    type='tel'
                    required
                    className='mt-2 focus:border-indigo-600'
                    onChange={e => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, '');
                    }}
                  />
                </div>
                <div>
                  <label>Password</label>
                  <Input
                    aria-label='Password'
                    type='password'
                    required
                    className='mt-2 focus:border-indigo-600'
                    minLength={3}
                  />
                </div>
                {needOTP && (
                  <div>
                    <label>OTP</label>
                    <Input
                      aria-label='Otp'
                      type='tel'
                      required
                      className='mt-2 focus:border-indigo-600'
                      onChange={e => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }}
                      minLength={6}
                      maxLength={6}
                    />
                  </div>
                )}
                <div className='pt-1'>
                  <Button className='w-full text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 ring-offset-2 ring-indigo-600 focus:ring'>
                    Log in
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
