import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../components/ui/Button/button';
import { HttpHandler } from '../lib/HttpRequestHandler';

function LandingPage() {
  useEffect(()=>{

  })
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="This is the home page of my SEO-friendly React app."
        />
        <meta name="keywords" content="React, SEO, Home" />
        <meta
          property="og:title"
          content="Home Page - My SEO-friendly React App"
        />
        <meta
          property="og:description"
          content="This is the home page of my SEO-friendly React app."
        />
      </Helmet>
      <div>landingPage</div>
      <Button onClick={async()=>{
          const res = await HttpHandler.get("http://localhost:5000/",{
            withCredentials:true
          })
          console.log(res)

      }}>
        Check Authentication
      </Button>
      <Button onClick={async()=>{
        const width = 500;
        const height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;
      
        window.open(
          'http://localhost:5000/auth/google', 
          'Google Login',
          `width=${width},height=${height},top=${top},left=${left}`
        );
      
      }}>
        Google Login with popup
        </Button>
        <Button onClick={async()=>{
          window.location.href = "http://localhost:5000/auth/google"
      }}>
        Google Login
        </Button>


    </>
  );
}

export default LandingPage;
