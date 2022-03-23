import React from 'react';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';

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
    borderRadius: 7,
  },
};

const BaseModal = ({ isOpen, onRequestClose, label, title, children }) => {
  return (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={onRequestClose} contentLabel={label}>
      <div className='flex h-12 items-center py-2 px-4 text-xl text-white'>
        <div className='grow'>{title}</div>
        <button onClick={onRequestClose} className='rounded-full bg-opacity-0 p-2 hover:bg-white	hover:bg-opacity-5'>
          <MdClose className='' />
        </button>
      </div>
      {children}
    </Modal>
  );
};

export default BaseModal;
