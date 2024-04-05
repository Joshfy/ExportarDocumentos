import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Descargar } from '../Descargar';
// Estilos del botón
const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// Estilos del modal
const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  justify-content:center;
  width: 50vw;
  height: auto;
  background-color: #fff;
  padding: 50px;
  border-radius: 16px;
`;

// Componente de modal
export const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalWrapper>
      <ModalContent>
      <button onClick={onClose}>X</button>

        <Descargar/>
      </ModalContent>
    </ModalWrapper>
  );
};

// Componente principal
export const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Button onClick={openModal}>Exportar Datos</Button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};
