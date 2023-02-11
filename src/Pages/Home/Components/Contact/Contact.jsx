import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { MdPhone, MdOutlineMail } from 'react-icons/md';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  //user cannot send empty email or without providing a name
  const sendEmail = (e) => {
    e.preventDefault();

    const nameInput = form.current.elements.user_name;
    const emailInput = form.current.elements.user_email;
    const messageInput = form.current.elements.message;

    if (!nameInput.value || !emailInput.value || !messageInput.value) {
      setErrorMessage('All fields are required!');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    setErrorMessage('');

    //configuration of emailjs
    emailjs
      .sendForm(
        'service_6s8rrsc',
        'template_3g6q13j',
        form.current,
        'w5RMHAS865JKKkpT5'
      )
      .then(
        (result) => {
          console.log('Message Sent');
          setSuccessMessage('Thank you for your feedback!');
          setTimeout(() => setSuccessMessage(''), 3000);
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
          {successMessage && <div className='success'>{successMessage}</div>}

          <input type='submit' value='Send' className='send-btn' />
        </form>
      </div>

      <div className='right'>
        <p>
          <a href='tel:+96176887508'>
            <MdPhone className='icon' /> +961 76 88 75 08
          </a>
        </p>
        <p>
          <a href='mailto:toniabouabsi000@gmail.com'>
            <MdOutlineMail className='icon' /> toniabouabsi000@gmail.com{' '}
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
