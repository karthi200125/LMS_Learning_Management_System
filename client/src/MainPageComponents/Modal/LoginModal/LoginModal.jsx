import Input from '../../Input/Input'
import Modal from '../Modal'
import './LoginModal.scss'
import Button from '../../Button/Button'
import { MdArrowRightAlt } from "react-icons/md";

const LoginModal = ({ isOpen, onClose }) => {

    const bodtcontent = (
        <form className='regform'>
            <h2>Login with your Account</h2>
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
            <div className='route'>Dont you have an Account ?
                <span>Create new account</span>
            </div>
        </form>
    )

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Login" subTitle="welcome Back skillSphere" bodyContent={bodtcontent} />
    )
}

export default LoginModal