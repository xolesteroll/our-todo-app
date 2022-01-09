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

    return (
        <li className={c.listItem} >
            <p>{text}</p>
            <div onDoubleClick={onDoubleClickHandler}>
                {!editStatusMode && <p>{status}</p>}
                {editStatusMode &&
                    <div>
                        {statusesList.map(s => <button onClick={() => changeTodoStatus(s)} key={s}>{s}</button>)}
                    </div>
                }
            </div>
            <button className={c.deleteBtn} onClick={() => onRemoveTodo(id)}>delete</button>
        </li>
    );
};

export default TodoItem;
