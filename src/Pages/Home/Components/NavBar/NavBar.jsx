import React, { useRef, useState, useEffect, useContext } from 'react';
import './NavBar.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { AuthContext } from '../../../../Context/authContext';
import Logo from './Logomoodify.png';

const NavBar = () => {
  const { setCurrentUser } = useContext(AuthContext);
  const navRef = useRef();

  //responsive navbar for mobile view
  const showNavbar = () => {
    navRef.current.classList.toggle('responsive_nav');
  };

  const [navbarStyle, setNavbarStyle] = useState({});

  //scrolling effect and navbar color
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 100) {
        setNavbarStyle({ backgroundColor: 'black' });
      } else {
        setNavbarStyle({ backgroundColor: 'transparent' });
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  //Logout function
  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <header
      style={navbarStyle}
      className={
        window.scrollY > window.innerHeight - 110 ? 'black' : 'transparent'
      }
    >
      <div className='p-name'>
        <img src={Logo} alt='Logo' />
        <h4 className='m-2'>moodyTunes</h4>
      </div>
      <nav ref={navRef}>
        <Link to='landingPage' offset={-100}>
          <p onClick={showNavbar}>Home</p>
        </Link>
        <Link to='prediction' offset={-100}>
          <p onClick={showNavbar}>Prediction</p>
        </Link>
        <Link to='about' offset={-100}>
          <p onClick={showNavbar}>About</p>
        </Link>
        <Link to='contact' offset={-100}>
          <p onClick={showNavbar}>Contact us</p>
        </Link>

        <button className='btn btn-logout' onClick={handleLogout}>
          Logout
        </button>
        <button className='nav-btn nav-close-btn' onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className='nav-btn nav-mobile' onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
};

export default NavBar;
