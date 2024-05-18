import { useState, useEffect } from "react";

import Head from "next/head";
import GradientWrapper from "../components/GradientWrapper";
import CTA from "../components/ui/CTA";
import Features from "../components/ui/Features";
import FooterCTA from "../components/ui/FooterCTA";
import Hero from "../components/ui/Hero";
import LogoGrid from "../components/ui/LogoGrid";
import Testimonials from "../components/ui/Testimonials";
import ToolKit from "../components/ui/ToolKit";

export default function Home() {
  const [response, setResponse] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('Authorization')
        },
      }).then(async (res) => await res.json());

      setResponse(res)
    }

    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>Auth Portal - Home</title>
      </Head>

      <div className='pt-28 pb-12'>
        <div className='custom-screen text-gray-600'>
          <div className='max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none'>
            <div className='max-w-lg sm:text-center lg:text-left'>
              <h1 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
                This is a protected page
              </h1>
              <p className='mt-3'>
                Let's try to get a request to protected route. <br/><br/>
                Protected route response: {response?.message}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Hero /> */}
      {/* <LogoGrid /> */}
      {/* <GradientWrapper>
        <Features />
        <CTA />
      </GradientWrapper>
      <ToolKit />
      <GradientWrapper>
        <Testimonials />
      </GradientWrapper> */}
      {/* <FooterCTA /> */}
    </>
  );
}
