import React from 'react';

import c from './TabsList.module.css'
import {useSelector} from "react-redux";

const TabsList = ({onNavButtonClickHandler}) => {
    const statusesList = useSelector(state => state.todos.statuses)
    const todosQuantity = useSelector(state => state.todos.quantity)

    return (
        <ul className={c.tabsNav}>
            <li className={c.tabsNavItem} onClick={() => onNavButtonClickHandler('all')}>All{`(${todosQuantity.all})`}</li>
            {statusesList.map(h => <li
                    className={c.tabsNavItem}
                    key={h.id}
                    onClick={() => onNavButtonClickHandler(h.id)}
                >
                    {h.label}{`(${todosQuantity[h.id]})`}
                </li>
            )}
        </ul>
    );
};

export default TabsList;
