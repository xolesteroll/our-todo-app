import React from 'react';
import ModalOverlay from "./ModalOverlay/ModalOverlay";

import c from './Modal.module.css'
import {createPortal} from "react-dom";

const Modal = ({message, onClose, onSubmit, submittable}) => {
    const portalDestination = document.getElementById('modal-root')


    return (
        createPortal(<ModalOverlay onModalClose={onClose}>
            <div className={c.modal}>
                <p>{message}</p>
                {!submittable && <button onClick={onClose}>close</button>}
                {submittable &&
                    <>
                        <button onClick={onSubmit}>Submit</button>
                        <button onClick={onClose}>Cancel</button>
                    </>
                }
            </div>
        </ModalOverlay>, portalDestination)
    );
};

export default Modal;
