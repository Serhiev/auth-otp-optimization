import Head from "next/head";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Checkbox from "../components/ui/Checkbox";

export default function GetStarted() {
  const servicesItems = [
    "Mobile development",
    "UI/UX Design",
    "web development",
    "SEO",
  ];

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
                onSubmit={(e) => e.preventDefault()}
                className='space-y-5 font-medium'>
                <div>
                  <label>Email</label>
                  <Input
                    aria-label='Email'
                    type='email'
                    required
                    className='mt-2 focus:border-indigo-600'
                  />
                </div>
                <div>
                  <label>Password</label>
                  <Input
                    aria-label='Password'
                    type='password'
                    required
                    className='mt-2 focus:border-indigo-600'
                    minLength={10}
                  />
                </div>
                {/* <div>
                  <label>Message</label>
                  <textarea
                    aria-label='Message'
                    required
                    className='w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'></textarea>
                </div>
                <div>
                  <label>Service</label>
                  <ul className='mt-3 flex flex-wrap gap-x-8 gap-y-3 font-normal max-w-md sm:gap-x-16'>
                    {servicesItems.map((item, idx) => (
                      <li key={idx} className='flex gap-x-2 items-center'>
                        <Checkbox id={`service-${idx}`} />
                        <label htmlFor={`service-${idx}`} className='text-sm'>
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div> */}
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
