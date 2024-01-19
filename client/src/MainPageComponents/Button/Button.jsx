import React from 'react';
import LoadingSpin from '../LoadingSpin/LoadingSpin';
import './Button.scss';

const Button = ({ icon, title, bg, color, classname, onClick, glow, isLoading }) => {

    return (
        <button className={classname ? classname : "btn"} style={{ backgroundColor: bg, color: color || "white", boxShadow: glow === false ? "" : "0 0 70px #412b7f", cursor: isLoading && "not-allowed" }} onClick={onClick} aria-busy={isLoading} aria-disabled={isLoading}>
            {isLoading &&
                <LoadingSpin />
            }
            <div>{title}</div>
            {icon && <div className='btnicon'>{icon}</div>}
        </button >
    );
}

export default Button;
