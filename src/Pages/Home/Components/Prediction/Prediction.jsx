import React, { useState, useRef, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import ScaleLoader from 'react-spinners/ScaleLoader';
import './Prediction.css';
import Tracks from '../Tracks/Tracks';
import ScrollDown from '../ScrollDown/ScrollDown';

const Prediction = () => {
  //video constraints
  const [videoConstraints, setVideoConstraints] = useState({
    width: 400,
    height: 400,
    facingMode: 'user',
  });
  //update video constraints based on the width of the screen
  useEffect(() => {
    function updateVideoConstraints() {
      if (window.innerWidth < window.innerHeight) {
        setVideoConstraints({
          width: Math.min(window.innerWidth, 400),
          height: Math.min(window.innerWidth, 400),
          facingMode: 'user',
        });
      } else {
        setVideoConstraints({
          width: Math.min(window.innerHeight, 400),
          height: Math.min(window.innerHeight, 400),
          facingMode: 'user',
        });
      }
    }

    window.addEventListener('resize', updateVideoConstraints);

    // remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', updateVideoConstraints);
    };
  });

  //Use states
  const [picture, setPicture] = useState('');
  const [expression, setExpression] = useState('');
  const [loading, setLoading] = useState(false);
  const [webcamOpen, setWebcamOpen] = useState(false);
  const [playlistType, setPlaylistType] = useState('');
  const webcamRef = useRef(null);
  const color = '#FFA500';

  //if there is a picture, detect emotions
  useEffect(() => {
    if (picture !== '') {
      setLoading(true);
      getEmotion();
    }
  }, [picture]);

  //Current user:
  const currentUser = JSON.parse(localStorage.getItem('user')) || null;

  //get a screenshot of the video
  const capture = useCallback(() => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);
  }, []);

  //Get emotion
  const getEmotion = async () => {
    setLoading(true);
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
    await faceapi.nets.faceExpressionNet.loadFromUri('/models');

    const image = document.getElementById('predictionFace');
    const results = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceExpressions();

    var arr = results[0].expressions;

    const { angry, disgusted, fearful, happy, neutral, sad, surprised } = arr;

    let emotions = [];
    emotions.push(angry, disgusted, fearful, happy, neutral, sad, surprised);

    //Getting the biggest value
    const maxValue = emotions.reduce((a, b) => Math.max(a, b));

    let emotionIndex = emotions.indexOf(maxValue);

    let emotion;

    if (emotionIndex === 0) {
      emotion = 'Angry';
      setPlaylistType(currentUser.angry);
    } else if (emotionIndex === 1) {
      emotion = 'Disgusted';
      setPlaylistType(currentUser.disgusted);
    } else if (emotionIndex === 2) {
      emotion = 'Fearful';
      setPlaylistType(currentUser.fearful);
    } else if (emotionIndex === 3) {
      emotion = 'Happy';
      setPlaylistType(currentUser.happy);
    } else if (emotionIndex === 4) {
      emotion = 'Neutral';
      setPlaylistType(currentUser.neutral);
    } else if (emotionIndex === 5) {
      emotion = 'Sad';
      setPlaylistType(currentUser.sad);
    } else if (emotionIndex === 6) {
      emotion = 'Surprised';
      setPlaylistType(currentUser.surprised);
    }

    setExpression(emotion);
    setLoading(false);
  };

  const arr = ['rock', 'soft', 'r&b', 'chill', 'sad', 'romance', 'happy'];

  const options = arr.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  return (
    <div id='prediction'>
      <div className='prediction'>
        <div className='left-prediction'>
          {webcamOpen ? (
            <div className='content'>
              <h2 className='mb-2 white snapshot'>Take a snapshot</h2>
              {picture !== '' ? (
                <div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setPicture('');
                      setExpression('');
                    }}
                    className='btn m-4 retake'
                  >
                    Retake
                  </button>

                  <div className='response '>
                    {loading ? (
                      <ScaleLoader
                        color={color}
                        loading={loading}
                        size={15}
                        aria-label='Loading Spinner'
                        data-testid='loader'
                      />
                    ) : (
                      <div>
                        {!loading && expression ? (
                          <div>
                            <h3>
                              Hi{' '}
                              <span className='uppercase white'>
                                {currentUser.name}
                                {', '}
                              </span>
                              You seem to be{' '}
                              <span className='orange uppercase'>
                                {expression}.
                              </span>
                            </h3>

                            <h3>
                              <span className='orange'>
                                Scroll down and enjoy your
                                <span className='white'>
                                  {' '}
                                  {playlistType}{' '}
                                </span>{' '}
                                songs or select a type of your choice
                                <select
                                  defaultValue={playlistType}
                                  onClick={(e) => {
                                    setPlaylistType(e.target.value);
                                  }}
                                  className='form-control'
                                >
                                  {options}
                                </select>
                              </span>{' '}
                            </h3>
                            <ScrollDown />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className='text-center'>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      capture();
                    }}
                    className='btn capture1'
                  >
                    Capture
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='intro'>
              <h2 className='text-center title'>
                Welcome to <span className='orange'> moodyTunes!</span>
              </h2>
              <p>
                To get started, look into the camera and make a facial
                expression reflecting how you feel.
              </p>
              <p>
                The system will analyze your expression and use it to recommend
                some songs that we think you will enjoy. You can try different
                expressions to see how they affect the recommendations.
              </p>
              <p>
                Below, you will see a list of recommended songs. You can listen
                to them by clicking on the play button or try a new expression
                to get a different set of recommendations.
              </p>
              <p>
                Thank you for using the music recommendation system. We hope you
                find some songs that you enjoy!
              </p>
            </div>
          )}
        </div>
        <div className='right-prediction'>
          <div className='inner-right-prediction'>
            <button
              className='btn btn-prediction'
              onClick={() => setWebcamOpen(!webcamOpen)}
            >
              {webcamOpen ? 'Close Webcam' : 'Open Webcam'}
            </button>
            {webcamOpen ? (
              <div
                className='webcam mt-3'
                style={{
                  objectFit: 'cover',
                  height: '100%',
                  width: '100%',
                  maxHeight: '400px',
                  maxWidth: '400px',
                  '--video-size': Math.max(
                    videoConstraints.width,
                    videoConstraints.height
                  ),
                }}
              >
                {picture === '' ? (
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    videoConstraints={videoConstraints}
                  />
                ) : (
                  <img
                    id='predictionFace'
                    src={picture}
                    alt='Prediction face'
                  />
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      {expression ? <Tracks playlistType={playlistType} /> : ''}
    </div>
  );
};

export default Prediction;
