import React from 'react'
import { GoogleAnalytics } from "@next/third-parties/google";
import LandingPage from '@components/landing-page/LandingPage';

const Home = () => {
  return (
   
       
    <div>
        <GoogleAnalytics gaId="G-THWZDJH6WZ" />
         <LandingPage/>
    </div>
   
  )
}

export default Home;