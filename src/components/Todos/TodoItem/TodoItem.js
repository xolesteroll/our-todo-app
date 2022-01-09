import React, {useState} from 'react';

import c from './TodoItem.module.css'

const TodoItem = ({id, text, status, onRemoveTodo, onChangeTodoStatus, statusesList}) => {
    const [editStatusMode, setEditStatusMode] = useState(false)

    const onDoubleClickHandler = () => {
        setEditStatusMode(true)
    }

    const changeTodoStatus = (status) => {
        onChangeTodoStatus(id, status)
        setEditStatusMode(false)
    }

    const currentStatus = statusesList.find(s => s.id === status)
    const currentStatusColor = currentStatus.color

    return (
        <li className={c.listItem}>
            <p>{text}</p>
            <div onDoubleClick={onDoubleClickHandler}>
                {!editStatusMode && <span className={c.statusBar} style={{backgroundColor: currentStatusColor}}>{status}</span>}
                {editStatusMode &&
                <div className={c.statusControls}>
                    {statusesList.map(s => <button
                        className={c.statusBtn}
                        style={{backgroundColor: s.color}}
                        onClick={() => changeTodoStatus(s.id)}
                        key={s.id}
                    >
                        {s.label}
                    </button>)}
                </div>
                }
            </div>
            <button className={c.deleteBtn} onClick={() => onRemoveTodo(id)}>delete</button>
        </li>
    );
};

export default TodoItem;
