import React, { useState } from 'react';
import Input from '../../Input/Input';
import Modal from '../Modal';
import Button from '../../../MainPageComponents/Button/Button';
import { MdArrowRightAlt } from 'react-icons/md';
import { AxiosRequest } from '../../../Utils/AxiosRequest';
import './RegisterModal.scss';
import { toast } from 'sonner';
import { GoogleLogin } from '@react-oauth/google';
import googleLogin from '../../../Utils/GoogleLogin';

const RegisterModal = ({ isOpen, onClose, onLoginClick }) => {
    const [isLoading, setLoading] = useState(false);
    const [showpassword, setshowpassword] = useState(false);
    const [input, setInputs] = useState({
        role: '',
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (name, value) => {
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (selectedRole) => {
        setInputs((prev) => ({ ...prev, role: selectedRole }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!input.username || !input.email || !input.password || !input.role) {
            toast.error('Please fill in all the fields.');
            return;
        }

        try {
            setLoading(true);
            const res = await AxiosRequest.post('/auth/register', input);
            toast.success("User created successfully");
            onClose();
            onLoginClick();
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLoginclick = () => {
        onClose();
        onLoginClick();
    }

    const handleGoogleLogin = async (credentialResponse) => {
        await googleLogin(credentialResponse);
    }


    const bodyContent = (
        <form className='regform' onSubmit={onSubmit}>
            <h2>Create New Account</h2>
            <Input name='username' type='text' value={input.username} onChange={handleChange} />
            <div className="select">
                <div className="cbox">
                    <input
                        type="checkbox"
                        id='student'
                        checked={input.role === 'student'}
                        onChange={() => handleCheckboxChange('student')}
                    />
                    <label htmlFor="student">Student</label>
                </div>
                <div className="cbox">
                    <input
                        type="checkbox"
                        id='teacher'
                        checked={input.role === 'teacher'}
                        onChange={() => handleCheckboxChange('teacher')}
                    />
                    <label htmlFor="teacher">Teacher</label>
                </div>
            </div>
            <Input name='email' type='email' value={input.email} onChange={handleChange} />
            <Input name='password' type={showpassword ? "text" : 'password'} value={input.password} onChange={handleChange} />
            <div className="showpassword">
                <input type="checkbox" onChange={() => setshowpassword(!showpassword)} />
                <span>Show password</span>
            </div>
            <p>Forget password ?</p>
            <Button title='Register' icon={<MdArrowRightAlt size={25} />} glow={false} classname='btn' type='submit' isLoading={isLoading} />
            <div className='line'>
                <span className='or'>or</span>
            </div>
            <div className="gg">
                <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error('Google Login Failed')} />
            </div>
            <div className='route'>
                Already have an account? <span onClick={handleLoginclick}>Login</span>
            </div>
        </form>
    );

    return <Modal isOpen={isOpen} onClose={onClose} title='Register' subTitle='Welcome to รｋⓘⓁ𝐋Ş𝕡卄єяє' bodyContent={bodyContent} />;
};

export default RegisterModal;
