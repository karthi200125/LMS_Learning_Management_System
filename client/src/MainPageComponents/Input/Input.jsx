import React from 'react';
import './input.scss';

const Input = ({ type, name, value = '', onChange, err }) => {
    return (
        <div className='inputbox'>
            <input type={type || 'text'} required={true} value={value} onChange={(e) => onChange(name, e.target.value)} />
            <span>{name}</span>
            {err && <p className='error'>{err}</p>}
        </div>
    );
};

export default Input;
