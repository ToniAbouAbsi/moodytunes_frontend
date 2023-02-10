import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './Spinner.css';

const Spinner = () => {
  return (
    <div className='spinner'>
      <ClipLoader size={150} color={'orange'} loading={true} />
    </div>
  );
};

export default Spinner;
