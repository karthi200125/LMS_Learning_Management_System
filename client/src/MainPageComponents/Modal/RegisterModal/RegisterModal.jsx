import Input from '../../Input/Input'
import Modal from '../Modal'
import './RegisterModal.scss'
import Button from '../../../MainPageComponents/Button/Button'
import { MdArrowRightAlt } from "react-icons/md";

const RegisterModal = ({ isOpen, onClose }) => {

    const bodtcontent = (
        <form className='regform'>
            <h2>Create New Account</h2>
            <Input name="UserName" type="text" />
            <Input name="Email" type="email" />
            <Input name="Password" type="password" />
            <p>Forget password ?</p>
            <Button title="Register" icon={<MdArrowRightAlt size={25} />} glow={false} classname="btn" />
            <div className='line'>
                <span className='or'>or</span>
            </div>
            <div className="gg">
                {/* Google auth */}
            </div>
            <div className='route'>Already have Account ?
                <span>Login</span>
            </div>
        </form>
    )

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Register" subTitle="welcome to skillSphere" bodyContent={bodtcontent} />
    )
}

export default RegisterModal