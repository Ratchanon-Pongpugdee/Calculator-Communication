import React from 'react';
import './Button.css'; // สร้างไฟล์ CSS แยกสำหรับ Button

const Button = ({ onClick, children, className }) => {
  return (
    <button className={`calculator-button ${className || ''}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;