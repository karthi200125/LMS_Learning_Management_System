import Input from '../../Input/Input'
import Modal from '../Modal'
import './LoginModal.scss'
import Button from '../../Button/Button'
import { MdArrowRightAlt } from "react-icons/md";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AxiosRequest } from '../../../Utils/AxiosRequest';
import { useDispatch } from 'react-redux';
import { login } from '../../../Redux/AuthSlice';

const LoginModal = ({ isOpen, onClose }) => {

    const [input, setInputs] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (name, value) => {
        setInputs((prev) => ({ ...prev, [name]: value }));
        setErr('')
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await AxiosRequest.post('/auth/login', input);
            dispatch(login(res.data))
            navigate('/');
            toast.success("Login successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErr(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const bodyContent = (
        <form className='regform'>
            <h2>Login with your Account</h2>
            <Input name='email' type='email' value={input.email} onChange={handleChange} />
            <Input name='password' type='password' value={input.password} onChange={handleChange} />
            <p>Forget password ?</p>
            <Button title="login" icon={<MdArrowRightAlt size={25} />} glow={false} className="btn" onClick={onSubmit} type='submit' isLoading={isLoading} />
            <div className='line'>
                <span className='or'>or</span>
            </div>
            <div className="gg">
                {/* Google auth */}
            </div>
            <div className='route'>Don't you have an Account ?
                <span>Create new account</span>
            </div>
        </form>
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Login" subTitle="welcome Back skillSphere" bodyContent={bodyContent} />
    );
}

export default LoginModal;
