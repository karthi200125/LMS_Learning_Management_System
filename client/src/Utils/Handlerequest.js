import { toast } from 'sonner';
import { AxiosRequest } from './AxiosRequest';

const handleRequest = async ({ url, token, data, method, userId, successmsg }) => {
    // console.log({ url, token, data, method, userId, successmsg })    
    try {
        const result = await AxiosRequest({
            url,
            method: method,
            data,
            userId,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (successmsg) {
            toast.success(successmsg);
        }
        return result?.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
};

export default handleRequest;

