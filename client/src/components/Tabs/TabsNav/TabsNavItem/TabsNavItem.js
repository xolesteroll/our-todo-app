import React, {useState} from 'react';
import {NavLink, useParams} from "react-router-dom";

import c from './TabsNavItem.module.css'

const TabsNavItem = ({url, text, counter, activeBgColor}) => {
    const [bgColor, setBgColor] = useState('transparent')
    const params = useParams()

    const activeClassFunc = ({isActive}) => {
        if (isActive || (!params.statusFilter && url === "all")) {
            setBgColor(activeBgColor)
            return `${c.tabsNavItem} ${c.active}`
        } else {
            setBgColor('transparent')
            return c.tabsNavItem
        }
    }

    const styles = {
        backgroundColor: bgColor
    }

    return (
        <NavLink className={activeClassFunc} to={url} style={styles}>
            {text}<span>({counter ? counter : 0})</span>
        </NavLink>
    );
};

export default TabsNavItem;
