import React, {useState} from 'react';

import c from './Tabs.module.css'
import TodosList from "../Todos/TodosList";
import TabsList from "./TabsList/TabsList";

const Tabs = () => {
    const [activeStatus, setActiveStatus] = useState('all')

    const onNavButtonClickHandler = (status) => {
        setActiveStatus(status)
    }

    return (
        <div className={c.tabs}>
            <TabsList onNavButtonClickHandler={onNavButtonClickHandler}/>
            <div className={c.tabsContent}>
                <TodosList statusFilter={activeStatus}/>
            </div>
        </div>
    );
};

export default Tabs;
