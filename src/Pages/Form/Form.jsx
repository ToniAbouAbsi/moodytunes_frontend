import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Context/authContext';
import axios from 'axios';
import '../../style.css';
import './Form.css';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  //Use state

  const { currentUser, userName } = useContext(AuthContext);
  const [currentUsername, setCurrentUsername] = useState('');
  const [err, setErr] = useState();
  const navigate = useNavigate();

  //setting username
  useEffect(() => {
    currentUser === null
      ? setCurrentUsername(userName)
      : setCurrentUsername(currentUser.username);
  }, [currentUser, userName]);

  //form data with default values
  const [inputs, setInputs] = useState({
    sad: 'sad',
    happy: 'happy',
    angry: 'rock',
    neutral: 'chill',
    fearful: 'r&b',
    surprised: 'romance',
    disgusted: 'soft',
    username: currentUser == null ? userName : currentUser.username,
  });

  const input = useState({
    username: currentUser == null ? userName : currentUser.username,
  });

  //options of the dropdown
  const arr = ['rock', 'soft', 'r&b', 'chill', 'sad', 'romance', 'happy'];

  //list the options in the dropdown
  const options = arr.map((item, index) => {
    return (
      <option key={index} value={item}>
        {item}
      </option>
    );
  });

  //Handle Click add emotions: submits the user's choices to the db
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (currentUser !== null) {
        await axios.get(
          'https://moodytunes-api.onrender.com/api/auth/update',
          input
        );
      }
      await axios.put(
        'https://moodytunes-api.onrender.com/api/auth/addemotions',
        inputs
      );
      navigate('/login');
    } catch (err) {
      setErr(err);
    }
  };

  //Handle Change: changes the value of the input based on the selected item
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <div className='form'>
          <div>
            Hello {currentUser === null ? currentUsername : currentUser.name},
            please choose what type of music you would like us to display when
            you are:{' '}
          </div>

          <div className='form'>
            <div className='row'>
              {/* sad */}
              <div className='col'>
                <label htmlFor='sad' className='col-sm-2 col-form-label'>
                  Sad:
                </label>
                <select
                  value={inputs.sad}
                  name='sad'
                  onChange={handleChange}
                  className='form-control'
                  id='sad'
                >
                  {options}
                </select>
              </div>

              {/* happy */}
              <div className='col'>
                <label htmlFor='happy' className='col-sm-2 col-form-label'>
                  Happy:
                </label>
                <select
                  value={inputs.happy}
                  name='happy'
                  onChange={handleChange}
                  className='form-control'
                  id='happy'
                >
                  {options}
                </select>{' '}
              </div>
            </div>

            <div className='row'>
              {/*angry*/}
              <div className='col'>
                <label htmlFor='angry' className='col-sm-2 col-form-label'>
                  Angry:
                </label>
                <select
                  name='angry'
                  value={inputs.angry}
                  onChange={handleChange}
                  className='form-control'
                  id='angry'
                >
                  {options}
                </select>
              </div>

              {/*neutral*/}
              <div className='col'>
                <label htmlFor='neutral' className='col-sm-2 col-form-label'>
                  Neutral:
                </label>
                <select
                  name='neutral'
                  value={inputs.neutral}
                  onChange={handleChange}
                  className='form-control'
                  id='neutral'
                >
                  {options}
                </select>
              </div>
            </div>
            <div className='row'>
              {/*fearful*/}
              <div className='col'>
                <label htmlFor='fearful' className='col-sm-2 col-form-label'>
                  Fearful:
                </label>
                <select
                  name='fearful'
                  value={inputs.fearful}
                  onChange={handleChange}
                  className='form-control'
                  id='fearful'
                >
                  {options}
                </select>
              </div>
              {/*surprised*/}
              <div className='col'>
                <label htmlFor='surprised' className='col-sm-2 col-form-label'>
                  Surprised:
                </label>
                <select
                  name='surprised'
                  value={inputs.surprised}
                  onChange={handleChange}
                  className='form-control'
                  id='surprised'
                >
                  {options}
                </select>
              </div>
            </div>
            <div>
              {/*disgusted*/}
              <div className='form-group row'>
                <label htmlFor='disgusted' className='col-sm-2 col-form-label'>
                  Disgusted:
                </label>
                <div className='col-sm-12'>
                  <select
                    name='disgusted'
                    value={inputs.disgusted}
                    onChange={handleChange}
                    className='form-control'
                    id='disgusted'
                  >
                    {options}
                  </select>
                </div>
              </div>

              {err && err}

              {/* submit button */}
              <br />
              <button
                type='button'
                className='btn btn-warning float-end'
                onClick={handleClick}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
