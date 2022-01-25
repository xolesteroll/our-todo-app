import React, {useState} from 'react';

import c from './Mybutton.module.css'

const MyButton = ({text, bgColor, color, hoverColor, type, onClickHandler, paddingOnHover}) => {
    const [style, setStyle] = useState({
        color,
        backgroundColor: bgColor,
    })

    const colorOnHoverHandler = () => {
        setStyle({
            color,
            backgroundColor: hoverColor
        })
    }

    const colorOnUnhoverHAndler = () => {
        setStyle({
            color,
            backgroundColor: bgColor
        })
    }

    return (
        <button
            onClick={onClickHandler ? onClickHandler : null}
            className={`${c.myButton} ${paddingOnHover ? c.paddingAnimated : ''}`}
            onMouseEnter={colorOnHoverHandler}
            onMouseLeave={colorOnUnhoverHAndler}
            type={type ? type : 'button'}
            style={style}
        >
            {text}
        </button>
    );
};

export default MyButton;
