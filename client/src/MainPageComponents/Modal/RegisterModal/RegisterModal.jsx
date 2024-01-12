import React, { useState } from 'react';
import Input from '../../Input/Input';
import Modal from '../Modal';
import Button from '../../../MainPageComponents/Button/Button';
import { MdArrowRightAlt } from 'react-icons/md';
import { AxiosRequest } from '../../../Utils/AxiosRequest';
import './RegisterModal.scss';
import { toast } from 'sonner';

const RegisterModal = ({ isOpen, onClose }) => {
    const [input, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isLoading, setLoading] = useState(false);    

    const handleChange = (name, value) => {
        setInputs((prev) => ({ ...prev, [name]: value }));        
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await AxiosRequest.post('/auth/register', input);
            toast.success("user created successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message)
        } finally {
            setLoading(false);
        }
    };

    const bodyContent = (
        <form className='regform' onSubmit={onSubmit}>
            <h2>Create New Account</h2>
            <Input name='username' type='text' value={input.username} onChange={handleChange} />
            <Input name='email' type='email' value={input.email} onChange={handleChange} />
            <Input name='password' type='password' value={input.password} onChange={handleChange} />
            <p>Forget password ?</p>
            <Button title='Register' icon={<MdArrowRightAlt size={25} />} glow={false} classname='btn' type='submit' isLoading={isLoading} />
            <div className='line'>
                <span className='or'>or</span>
            </div>
            <div className='gg'>{/* Google auth */}</div>
            <div className='route'>
                Already have an account? <span>Login</span>
            </div>
        </form>
    );

    return <Modal isOpen={isOpen} onClose={onClose} title='Register' subTitle='Welcome to skillSphere' bodyContent={bodyContent} />;
};

export default RegisterModal;