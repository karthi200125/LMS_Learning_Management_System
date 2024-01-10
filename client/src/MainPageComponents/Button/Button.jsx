import React from 'react';
import './Button.scss';
import { MdArrowRightAlt } from "react-icons/md";

const Button = ({ icon, title, bg, color }) => {
    return (
        <button className="btn" style={{ backgroundColor: bg || "black", color: color || "white" }}>
            <div>{title}</div>
            {icon && icon || <MdArrowRightAlt />}
        </button>
    );
}

export default Button;
