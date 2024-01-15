import React from 'react';
import './Button.scss';
import { MdArrowRightAlt } from "react-icons/md";
import Spin from '../Spin/Spin';

const Button = ({ icon, title, bg, color, classname, onClick, glow, isLoading }) => {

    return (
        <button className={classname ? classname : "btn"} style={{ backgroundColor: bg, color: color || "white", boxShadow: glow === false ? "" : "0 0 70px #412b7f", cursor: isLoading && "not-allowed" }} onClick={onClick} disabled={isLoading}>
            {isLoading &&            
                <span>loading ....</span>
            }
            <div>{title}</div>
            {icon && <div className='btnicon'>{icon}</div>}
        </button >
    );
}

export default Button;
