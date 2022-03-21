import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#__next');

const modalStyles = {
  overlay: {
    zIndex: 99999,
    backgroundColor: 'rgb(0,0,0,0.7)',
  },
  content: {
    opacity: 100,
    width: '90vw',
    maxWidth: 1200,
    margin: 'auto',
    height: 'max-content',
    backgroundColor: 'var(--card)',
    border: 0,
    padding: 0,
    borderRadius: 10,
  },
};

const BaseModal = ({ isOpen, onRequestClose, label, children }) => {
  return (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={label}>
      {children}
    </Modal>
  );
};

export default BaseModal;

