import React from 'react';
import ModalOverlay from "./ModalOverlay/ModalOverlay";

import c from './Modal.module.css'
import {createPortal} from "react-dom";

const Modal = ({message, onClose}) => {
    const portalDestination = document.getElementById('modal-root')

    return (
        createPortal(<ModalOverlay onModalClose={onClose}>
            <div className={c.modal}>
                <p>{message}</p>
                <button onClick={onClose}>close</button>
            </div>
        </ModalOverlay>, portalDestination)
    );
};

export default Modal;
