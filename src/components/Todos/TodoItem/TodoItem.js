import React, {useState} from 'react';

import c from './TodoItem.module.css'

const TodoItem = React.memo(({id, text, status, onRemoveTodo, onChangeTodoStatus, statusesList}) => {
    console.log('render')
    const [editStatusMode, setEditStatusMode] = useState(false)

    const onDoubleClickHandler = () => {
        setEditStatusMode(true)
    }

    const changeTodoStatus = (status) => {
        onChangeTodoStatus(id, status)
        setEditStatusMode(false)
    }

    const currentStatusColor = statusesList.find(s => s.id === status).color

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
                        {s.id}
                    </button>)}
                </div>
                }
            </div>
            <button className={c.deleteBtn} onClick={() => onRemoveTodo(id)}>delete</button>
        </li>
    );
});

export default TodoItem;
