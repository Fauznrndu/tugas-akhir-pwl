import React from 'react';
import "./styles/Button.css"

const Button = ({text, onClick, dark, disabled}) => {
  return (
    <div className={dark ? 'button button-dark' : 'button'} onClick={onClick} disabled={disabled}>
      {text}
    </div>
  );
} 

export default Button;
