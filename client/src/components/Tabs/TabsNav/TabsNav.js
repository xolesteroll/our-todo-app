import React, {useEffect, useState} from 'react';

import c from './TabsNav.module.css'
import {useSelector} from "react-redux";
import TabsNavItem from "./TabsNavItem/TabsNavItem";

const TabsNav = () => {
    const statusesList = useSelector(state => state.todos.statuses)
    const todosQuantity = useSelector(state => state.todos.quantity)
    const [navItemsData, setNavItemsData] = useState([])

    useEffect(() => {
        const navItemsArray = [
            {
                id: 'all',
                label: 'All',
                color: 'black',
                qty: todosQuantity.all,
                isItemActive: true
            }
        ]
        statusesList.forEach(s => {
            navItemsArray.push({
                ...s,
                qty: todosQuantity[s.id],
                isItemActive: false
            })
        })
        setNavItemsData(navItemsArray)
    }, [statusesList, todosQuantity])


    const onChangeIsActiveHandler = (id) => {
        const changedArray = navItemsData.reduce((arr, curr) => {
            return [
                ...arr,
                {
                    ...curr,
                    isItemActive: curr.id === id
                }
            ]
        }, [])
        setNavItemsData(changedArray)
    }


    return (
        <nav className={c.tabsNav}>
            {navItemsData.map(item => <TabsNavItem
                url={item.id}
                key={item.id}
                text={item.label}
                counter={item.qty}
                activeBgColor={item.color}
                isItemActive={item.isItemActive}
                onChangeIsActive={() => onChangeIsActiveHandler(item.id)}
            />)}
        </nav>
    );
};

export default TabsNav;
