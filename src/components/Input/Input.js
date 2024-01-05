import React from 'react';
import './styles.scss';

const Input = ({type = 'text', placeholder = '', value = '', onChange}) => {
  return (
    <input type={type} className="input-custom" placeholder={placeholder} value={value} onChange={onChange}/>
  );
};

export default Input;
