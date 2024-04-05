import React, { useState } from 'react';

export const SendWtsp = () => {
  const [file, setFile] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleShare = () => {
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappLink);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <br />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
      />
      <br />
      <textarea
        placeholder="Message"
        value={message}
        onChange={handleMessageChange}
      />
      <br />
      <button onClick={handleShare}>Share via WhatsApp</button>
    </div>
  );
};

