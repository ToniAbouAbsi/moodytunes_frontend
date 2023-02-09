import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className='about'>
      <div className='container1'>
        <div className='a-left'>
          <h1>About MoodyTunes</h1>
          <p>
            MoodyTunes is a music recommendation system that suggests a playlist
            based on your face expression.
            <br /> Our app uses advanced facial recognition technology to
            analyze your mood and curate the perfect playlist to match your
            current emotion. Whether you're feeling happy, sad, or somewhere in
            between, MoodyTunes has you covered with the perfect tunes to suit
            your mood.
          </p>
        </div>
        <div className='a-right'>
          <p>
            "Music drowns my sorrows, music calms me when I am stressed. Music
            heals me when I'm ill. Music always makes things better."
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
