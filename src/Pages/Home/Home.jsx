import React from 'react';
import LandingPage from './Components/LandingPage/LandingPage';
import About from './Components/About/About';
import Prediction from './Components/Prediction/Prediction';
import Contact from './Components/Contact/Contact';
import { Element } from 'react-scroll';
import './Home.css';

const Home = () => {
  return (
    <div className='home'>
      <Element name='landingPage'>
        <LandingPage />
      </Element>
      <Element name='prediction'>
        <Prediction />
      </Element>
      <Element name='about'>
        <About />
      </Element>
      <Element name='contact'>
        <Contact />
      </Element>
    </div>
  );
};

export default Home;
