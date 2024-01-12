import './input.scss';

const Input = ({ type, name, err }) => {
    return (
        <div className='inputbox'>
            <input type={`${type || text}`} required={true} />
            <span>{name}</span>
            {err &&
                <p className='error'>{err}</p>
            }
        </div>
    )
}

export default Input