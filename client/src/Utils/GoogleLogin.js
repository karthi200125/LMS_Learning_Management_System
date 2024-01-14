// GoogleLogin.js
import { toast } from 'sonner';
import { AxiosRequest } from './AxiosRequest';
import { login } from '../Redux/AuthSlice';

const googleLogin = async (credentialResponse, dispatch, navigate) => {
    try {
        const res = await AxiosRequest.post('/auth/googlelogin', { credentials: credentialResponse.credential });
        dispatch(login(res.data));
        navigate('/');
        toast.success('Google login successfully');
    } catch (error) {
        console.error(error);
        toast.error('Google login failed');
    }
};

export default googleLogin;
