import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import axios from 'axios';
import './Register.css';
import Spinner from '../Spinner/Spinner';

const Register = () => {
  //Register Inputs
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
  });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [err, setErr] = useState(null);
  const [empty, setEmpty] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, setUserName } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) navigate('/');

    //styling
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    //user cannot submit empty data
    return () => {
      if (
        inputs.name !== '' &&
        inputs.email !== '' &&
        inputs.username !== '' &&
        inputs.password !== ''
      )
        setEmpty('');
    };
  }, [inputs]);

  //Handle Register
  const handleClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitted(true);

    try {
      if (
        inputs.name !== '' &&
        inputs.email !== '' &&
        inputs.username !== '' &&
        inputs.password !== ''
      ) {
        await axios.post(
          'https://moodytunes-api.onrender.com/api/auth/register',
          inputs
        );
        setIsLoading(false);
        navigate('/form');
      } else if (
        inputs.name === '' ||
        inputs.email === '' ||
        inputs.username === '' ||
        inputs.password === ''
      ) {
        setIsLoading(false);
        setEmpty('All fields are required!');
      }
    } catch (err) {
      setIsLoading(false);
      setErr(err.response.data);
    }
  };

  //Handle Change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className='auth-wrapper'>
      {isLoading && <Spinner />}
      <div className='auth-inner'>
        <form>
          <h3>Sign Up</h3>

          {/* name section */}
          <div className='mb-3'>
            <input
              type='text'
              name='name'
              placeholder='First Name'
              onChange={handleChange}
              className={
                isSubmitted && !inputs.name
                  ? ' form-control input1'
                  : ' form-control input2'
              }
            />
          </div>
          {/* email section */}
          <div className='mb-3'>
            <input
              type='email'
              name='email'
              className={
                isSubmitted && !inputs.email
                  ? ' form-control input1'
                  : ' form-control input2'
              }
              placeholder='Email'
              onChange={handleChange}
            />
          </div>

          {/* username section */}
          <div className='mb-3'>
            <input
              type='text'
              name='username'
              className={
                isSubmitted && !inputs.username
                  ? ' form-control input1'
                  : ' form-control input2'
              }
              placeholder='Username'
              onChange={(e) => {
                setInputs((prev) => ({
                  ...prev,
                  [e.target.name]: e.target.value,
                }));
                setUserName(e.target.value);
              }}
            />
          </div>
          {/* password section */}
          <div className='mb-3'>
            <input
              type='password'
              name='password'
              className={
                isSubmitted && !inputs.password
                  ? ' form-control input1'
                  : ' form-control input2'
              }
              placeholder='Password'
              onChange={handleChange}
            />
          </div>

          {empty && <p style={{ color: 'red' }}>{empty}</p>}
          {err && <p style={{ color: 'red' }}>{err}</p>}

          {/* submit button */}
          <div className='d-grid'>
            <button
              type='submit'
              className='btn btn-warning'
              onClick={handleClick}
            >
              Register
            </button>
          </div>

          {/* already registered */}
          {viewportWidth < 767 ? (
            <p className='forgot-password text-center'>
              Already registered?{' '}
              <Link to='/login' className='link'>
                Sign In
              </Link>
            </p>
          ) : (
            <p className='forgot-password text-right'>
              Already registered?{' '}
              <Link to='/login' className='link' style={{ color: 'orange' }}>
                Sign In
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
