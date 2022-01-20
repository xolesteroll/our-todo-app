import React, {useState} from 'react';

import c from './TodoItem.module.css'
import Modal from "../../UI/Modal/Modal";

const TodoItem = React.memo(({
                                 id,
                                 title,
                                 description,
                                 deleted,
                                 status,
                                 onRemoveTodo,
                                 onRestoreTodo,
                                 onChangeTodoStatus,
                                 statusesList
                             }) => {

    const [showModal, setShowModal] = useState(false)
    const [editStatusMode, setEditStatusMode] = useState(false)

    const onDoubleClickHandler = () => {
        setEditStatusMode(true)
    }

    const changeTodoStatus = (changedStatus) => {
        console.log(id)
        onChangeTodoStatus({
            id,
            title,
            status: changedStatus,
            description
        })
        setEditStatusMode(false)
    }

    const modalOpenHandler = () => {
        setShowModal(true)
    }

    const modalCloseHandler = () => {
        setShowModal(false)
    }

    const currentStatusColor = statusesList.find(s => s.id === status).color

    const actionBtn = !deleted ?
        <button className={`${c.actionBtn} ${c.deleteBtn}`} onClick={modalOpenHandler}>delete</button> :
        <button className={`${c.actionBtn} ${c.restoreBtn}`} onClick={modalOpenHandler}>restore</button>

    return (
        <>
            {showModal && <Modal
                message={`Are you sure you want to ${!deleted ? 'delete' : 'restore'} this todo???`}
                submittable
                onSubmit={!deleted ? () => onRemoveTodo(id) : () => onRestoreTodo(id)}
                onClose={modalCloseHandler}
            />}
            <li className={c.listItem}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div onDoubleClick={!deleted ? onDoubleClickHandler : null}>
                    {!editStatusMode && !deleted &&
                    <span className={c.statusBar} style={{backgroundColor: currentStatusColor}}>
                    {status}
                </span>}
                    {!editStatusMode && deleted &&
                    <>
                        <span>was on </span>
                        <span className={c.statusBar} style={{backgroundColor: currentStatusColor}}>
                {status}
                    </span>
                        <span> status before removal</span>
                    </>}
                    {editStatusMode &&
                    <div className={c.statusControls}>
                        {statusesList.map(s => <button
                            className={c.statusBtn}
                            style={{backgroundColor: s.color}}
                            onClick={() => changeTodoStatus(s.id)}
                            key={s.id}
                        >
                            {s.id}
                        </button>)}
                    </div>
                    }
                </div>
                {actionBtn}
            </li>
        </>
)
    ;
});

export default TodoItem;
