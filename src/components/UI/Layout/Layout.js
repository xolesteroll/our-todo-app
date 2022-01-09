import React from 'react';

import c from './Layout.module.css'

const Layout = (props) => {
    return (
        <div className={c.container}>
            {props.children}
        </div>
    );
};

export default Layout;