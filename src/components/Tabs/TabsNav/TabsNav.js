import React from 'react';

import c from './TabsNav.module.css'
import {useSelector} from "react-redux";
import TabsNavItem from "./TabsNavItem/TabsNavItem";

const TabsNav = () => {
    const statusesList = useSelector(state => state.todos.statuses)
    const todosQuantity = useSelector(state => state.todos.quantity)


    return (
        <nav className={c.tabsNav}>
            <TabsNavItem
                url="all"
                text="All"
                counter={todosQuantity.all}
                activeBgColor={"#000000"}
            />

            {statusesList.map(s => <TabsNavItem url={`${s.id}`}
                                                key={s.id}
                                                text={s.label}
                                                counter={todosQuantity[s.id]}
                                                activeBgColor={s.color}
                />
            )}
        </nav>
    );
};

export default TabsNav;
