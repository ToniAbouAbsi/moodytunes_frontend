import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MdPhone, MdOutlineMail } from 'react-icons/md';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  //user cannot send empty email or without providing a name
  const sendEmail = (e) => {
    e.preventDefault();

    const nameInput = form.current.elements.user_name;
    const emailInput = form.current.elements.user_email;
    const messageInput = form.current.elements.message;

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      setErrorMessage('All fields are required!!');
      return;
    }

    setErrorMessage('');

    //configuration of emailjs
    emailjs
      .sendForm(
        'service_wdl9l87',
        'template_gncz55l',
        form.current,
        'LNaNrwvt68aTE76Jk'
      )
      .then(
        (result) => {
          console.log('Message Sent');
          e.target.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className='contact'>
      <div className='left'>
        <h4>We care about your feedback:</h4>
        <form ref={form} onSubmit={sendEmail}>
          <input type='text' name='user_name' placeholder='Name' />
          <input type='email' name='user_email' placeholder='Email' />
          <textarea name='message' placeholder='Message' />
          {errorMessage && <div className='error'>{errorMessage}</div>}

          <input type='submit' value='Send' />
        </form>
      </div>
      <div className='right'>
        <p>
          <a href='tel:+96170581697'>
            <MdPhone className='icon' /> +961 70 581 697
          </a>
        </p>
        <p>
          <a href='mailto:yfh001@live.aul.edu.lb'>
            <MdOutlineMail className='icon' /> yfh001@live.aul.edu.lb{' '}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
