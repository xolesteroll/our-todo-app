import React from 'react';

import c from './TabsList.module.css'
import {useSelector} from "react-redux";

const TabsList = ({onNavButtonClickHandler, todosQuantity}) => {
    const statusesList = useSelector(state => state.todos.statuses)

    return (
        <ul className={c.tabsNav}>
            <li className={c.tabsNavItem} onClick={() => onNavButtonClickHandler('all')}>All{`(${todosQuantity.todos ? todosQuantity.todos : 0})`}</li>
            {statusesList.map(h => <li
                    className={c.tabsNavItem}
                    key={h.id}
                    onClick={() => onNavButtonClickHandler(h.id)}
                >
                    {h.label}{`(${todosQuantity[h.id] ? todosQuantity[h.id] : 0})`}
                </li>
            )}
        </ul>
    );
};

export default TabsList;
