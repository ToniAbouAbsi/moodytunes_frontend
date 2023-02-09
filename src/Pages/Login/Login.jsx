import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authContext';
import './Login.css';
const Login = () => {
  //Login Inputs
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [empty, setEmpty] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [err, setErr] = useState(null);
  const { currentUser, login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser !== null) navigate('/');

    //user cannot submit empty data
    return () => {
      if (inputs.username !== '' && inputs.password !== '') setEmpty('');
    };
  });

  //Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    try {
      if (inputs.username !== '' && inputs.password !== '') {
        await login(inputs);
        navigate('/');
      } else if (inputs.username === '' || inputs.password === '') {
        setEmpty('All fields are required!');
      }
    } catch (err) {
      setErr(err.response.data);
      console.log(err);
    }
  };

  //Handle Change
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className='auth-wrapper'>
      <div className='auth-inner'>
        <form>
          <h3> Sign In</h3>

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
              onChange={handleChange}
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

          {err && <p style={{ color: 'red' }}>{err}</p>}
          {empty && <p style={{ color: 'red' }}>{empty}</p>}

          {/* submit button */}
          <div className='d-grid'>
            <button
              type='submit'
              className='btn btn-warning'
              onClick={handleLogin}
            >
              Submit
            </button>
          </div>

          {/* Don't have an account */}
          <p className='forgot-password text-right'>
            Don't have an account?{' '}
            <Link to='/register' className='link' style={{ color: 'orange' }}>
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
