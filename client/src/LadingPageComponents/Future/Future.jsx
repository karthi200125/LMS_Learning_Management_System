import Button from '../../MainPageComponents/Button/Button'
import './Future.scss'
import { MdArrowRightAlt } from "react-icons/md";

const Future = () => {
    return (
        <div className='future'>
            <h1>The future of your</h1>
            <h1>carrier <span>starts here</span></h1>
            <div className='btm'>
                <Button title="join for free" icon={<MdArrowRightAlt size={25} />} />
                <Button title="Browse courses" classname='transparent' icon={<MdArrowRightAlt size={25} />} />
            </div>
            <div className="glow"></div>
        </div>
    )
}

export default Future