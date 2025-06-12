import React from 'react';
import './Display.css'; // สร้างไฟล์ CSS แยกสำหรับ Display

const Display = ({ value }) => {
  return (
    <div className="calculator-display">
      <input type="text" value={value} readOnly />
    </div>
  );
};

export default Display;