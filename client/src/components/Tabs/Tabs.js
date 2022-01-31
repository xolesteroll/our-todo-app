import React from 'react';

import c from './Tabs.module.css'
import TodosList from "../Todos/TodosList";
import TabsNav from "./TabsNav/TabsNav";

const Tabs = () => {

    return (
        <div className={c.tabs}>
            <TabsNav />
            <div className={c.tabsContent}>
                <TodosList />
            </div>
        </div>
    );
};

export default Tabs;
