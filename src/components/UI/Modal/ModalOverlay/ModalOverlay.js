import React from 'react';

import c from './ModalOverlay.module.css'

const ModalOverlay = ({children, onModalClose}) => {
    return (
        <div onClick={onModalClose} className={c.overlay}>
            {children}
        </div>
    );
};

export default ModalOverlay;
