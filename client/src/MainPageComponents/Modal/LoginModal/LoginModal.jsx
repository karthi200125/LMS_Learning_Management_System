import { GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { MdArrowRightAlt } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { login } from '../../../Redux/AuthSlice';
import { AxiosRequest } from '../../../Utils/AxiosRequest';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Modal from '../Modal';
import './LoginModal.scss';
import googleLogin from '../../../Utils/GoogleLogin';
import { createCourse } from '../../../Redux/CourseSlice';


const LoginModal = ({ isOpen, onClose, RegOpen }) => {
    const [input, setInputs] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const [showpassword, setshowpassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (name, value) => {
        setInputs((prev) => ({ ...prev, [name]: value }));
        setErr('');
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await AxiosRequest.post('/auth/login', input);
            dispatch(login(res?.data));
            dispatch(createCourse(res?.data?.coursesEnrolled));
            navigate('/');            
            toast.success('Login successfully');
        } catch (error) {
            toast.error(error?.response?.data?.message);
            setErr(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        await googleLogin(credentialResponse, dispatch, navigate)
    };

    const handleregopen = () => {
        onClose();
        RegOpen();
    };

    const bodyContent = (
        <form className="regform">
            <h2>Login with your Account</h2>
            <Input name="email" type="email" value={input.email} onChange={handleChange} />
            <Input name="password" type={showpassword ? 'text' : 'password'} value={input.password} onChange={handleChange} />
            <div className="showpassword">
                <input type="checkbox" onChange={() => setshowpassword(!showpassword)} />
                <span>show password</span>
            </div>
            <p>Forget password ?</p>
            <Button title="login" icon={<MdArrowRightAlt size={25} />} glow={false} className="btn" onClick={onSubmit} type="submit" isLoading={isLoading} />
            <div className="line">
                <span className="or">or</span>
            </div>
            <div className="gg">
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error('Google Login Failed')} />
            </div>
            <div className="route">
                Don't you have an Account ?<span onClick={handleregopen}>Create a new account</span>
            </div>
        </form>
    );

    return <Modal isOpen={isOpen} onClose={onClose} title="Login" subTitle="welcome Back รｋⓘⓁ𝐋Ş𝕡卄єяє" bodyContent={bodyContent} />;
};

export default LoginModal;
