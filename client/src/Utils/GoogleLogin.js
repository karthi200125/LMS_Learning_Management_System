// GoogleLogin.js
import { toast } from 'sonner';
import { AxiosRequest } from './AxiosRequest';
import { login } from '../Redux/AuthSlice';
import { createCourse } from '../Redux/CourseSlice';

const googleLogin = async (credentialResponse, dispatch, navigate) => {
    try {
        const res = await AxiosRequest.post('/auth/googlelogin', { credentials: credentialResponse.credential });
        dispatch(login(res.data));
        dispatch(createCourse(res?.data?.coursesEnrolled));
        navigate('/');
        toast.success('Google login successfully');
        console.log(res.data)
    } catch (error) {
        console.error(error);
        toast.error('Google login failed');
    }
};

export default googleLogin;
