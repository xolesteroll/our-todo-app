import React, {useState} from 'react';

import c from './Tabs.module.css'
import TodosList from "../Todos/TodosList";
import {useSelector} from "react-redux";

const Tabs = () => {
    const [activeStatus, setActiveStatus] = useState('all')
    const statusesList = useSelector(state => state.todos.statuses)
    console.log(activeStatus)

    const onNavButtonClickHandler = (status) => {
        setActiveStatus(status)
    }

    return (
        <div className={c.tabs}>
            <ul className={c.tabsNav}>
                <li className={c.tabsNavItem} onClick={() => onNavButtonClickHandler('all')}>All</li>
                {statusesList.map(h => <li
                        className={c.tabsNavItem}
                        key={h.id}
                        onClick={() => onNavButtonClickHandler(h.id)}
                    >
                        {h.label}
                    </li>
                )}
            </ul>
            <div className={c.tabsContent}>
                <TodosList statusFilter={activeStatus}/>
            </div>
        </div>
    );
};

export default Tabs;
