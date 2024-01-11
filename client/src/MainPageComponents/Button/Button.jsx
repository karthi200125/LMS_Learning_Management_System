import React from 'react';
import './Button.scss';
import { MdArrowRightAlt } from "react-icons/md";

const Button = ({ icon, title, bg, color, classname }) => {
    return (
        <button className={classname ? classname : "btn"} style={{ backgroundColor: bg, color: color || "white" }}>
            <div>{title}</div>
            {icon &&
                <div className='btnicon'>{icon}</div>                            
            }
        </button>
    );
}

export default Button;
