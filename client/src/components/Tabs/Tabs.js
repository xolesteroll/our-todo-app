import React from 'react';

import c from './Tabs.module.css'
import TodosList from "../Todos/TodosList";
import TabsList from "./TabsNav/TabsNav";

const Tabs = () => {

    return (
        <div className={c.tabs}>
            <TabsList />
            <div className={c.tabsContent}>
                <TodosList />
            </div>
        </div>
    );
};

export default Tabs;
