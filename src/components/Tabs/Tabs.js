import React, {useState} from 'react';

import c from './Tabs.module.css'
import TodosList from "../Todos/TodosList";
import TabsList from "./TabsList/TabsList";

const Tabs = () => {
    const [activeStatus, setActiveStatus] = useState('all')
    const [todosQty, setTodosQty] = useState({})

    console.log(todosQty)
    const onNavButtonClickHandler = (status) => {
        setActiveStatus(status)
    }

    const setTodosQtyHandler = (qtyObject) => {
        setTodosQty(qtyObject)
    }

    return (
        <div className={c.tabs}>
            <TabsList todosQuantity={todosQty} onNavButtonClickHandler={onNavButtonClickHandler}/>
            <div className={c.tabsContent}>
                <TodosList setTodosQtyHandler={setTodosQtyHandler} statusFilter={activeStatus}/>
            </div>
        </div>
    );
};

export default Tabs;
