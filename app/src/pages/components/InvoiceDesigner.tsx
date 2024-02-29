import React, { useState } from 'react';

const InvoiceDesigner = () => {
  const [text, setText] = useState('Your Receipt');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleTextChange = (e:any) => {
    setText(e.target.textContent);
  };

  const handleColorChange = (e:any) => {
    setBackgroundColor(e.target.value);
  };

  return (
    <div style={{ backgroundColor, padding: '20px', borderRadius: '8px' }}>
      <div
        contentEditable
        onInput={handleTextChange}
        style={{
          minHeight: '100px',
          border: '1px solid #ccc',
          padding: '10px',
          marginBottom: '20px',
        }}
      >
        {text}
      </div>

      <label htmlFor="backgroundColor">Background Color:</label>
      <input
        type="color"
        id="backgroundColor"
        value={backgroundColor}
        onChange={handleColorChange}
      />
    </div>
  );
};

export default InvoiceDesigner;
