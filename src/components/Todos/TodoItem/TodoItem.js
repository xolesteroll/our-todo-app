import React, {useState} from 'react';

import c from './TodoItem.module.css'

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

    const [editStatusMode, setEditStatusMode] = useState(false)

    const onDoubleClickHandler = () => {
        setEditStatusMode(true)
    }

    const changeTodoStatus = (status) => {
        console.log(id)
        onChangeTodoStatus(id, status)
        setEditStatusMode(false)
    }

    const currentStatusColor = statusesList.find(s => s.id === status).color

    const actionBtn = !deleted ?
        <button className={`${c.actionBtn} ${c.deleteBtn}`} onClick={() => onRemoveTodo(id)}>delete</button> :
        <button className={`${c.actionBtn} ${c.restoreBtn}`} onClick={() => onRestoreTodo(id)}>restore</button>


    return (
        <li className={c.listItem}>
            <h3>{title}</h3>
            <p>{description}</p>
            <div onDoubleClick={!deleted ? onDoubleClickHandler : null}>
                {!editStatusMode &&
                <span className={c.statusBar} style={{backgroundColor: currentStatusColor}}>{status}</span>}
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
    );
});

export default TodoItem;
