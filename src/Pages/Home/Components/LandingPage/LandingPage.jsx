import React from 'react';
import './LandingPage.css';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-scroll';
import Typed from 'react-typed';

const LandingPage = () => {
  return (
    <div className='landing-page'>
      <div className='shade'>
        <NavBar />
        <div className='container'>
          <div className='slogan1'>FACE THE MUSIC</div>
          <div className='slogan2'>
            Embrace every emotion with{' '}
            <Typed
              strings={[
                'moodytunes',
                'the music app that understands you',
                'personalized playlists from Spotify',
              ]}
              typeSpeed={110}
              backSpeed={50}
              loop
            />
          </div>
          <Link to='prediction' offset={-100}>
            <button type='button' className='btn btn-explore mb-5'>
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
