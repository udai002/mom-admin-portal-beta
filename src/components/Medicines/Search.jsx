import React, { useState } from 'react';

function MyInput() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      type="text"
      value={inputValue}
      onChange={handleChange}
      className='border border-teal-300 rounded-lg p-2 w-100 h-10 mt-10 focus:ring-2 '
      placeholder="Search for medicines..."
    />
  );
}

export default MyInput;