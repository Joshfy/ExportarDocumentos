import React, { useEffect } from 'react';
import styled from '@emotion/styled';

export const Alert = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Desaparecer la alerta después de 3 segundos
      setShow(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AlertContainer>
      {message}
    </AlertContainer>
  );
};

const AlertContainer = styled.div`
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: #ffcccc;
  padding: 10px 20px;
  border-radius: 5px;
  border: 1px solid #ff0000;
  animation: fadeOut 3s ease forwards;
  
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
      visibility: hidden;
    }
  }
`;
