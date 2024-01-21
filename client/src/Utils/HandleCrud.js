import { useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosRequest } from "./AxiosRequest";
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

const useHandleCrud = (url, method, data, successmsg, dp, nav , disp ) => {

    const [Data, setData] = useState([])
    const [err, seterr] = useState(false)
    const [isLoading, setisLoading] = useState(false)
    const token = localStorage.getItem('access_token');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const fetchData = async () => {
        try {
            setisLoading(true)
            const res = await AxiosRequest({
                url: `${url}`,
                method: method,
                data: data,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            })
            setData(res?.data)
            toast.success(successmsg)
            if (typeof dp === 'function') {
                dispatch(dp(res.data));
                dispatch(disp);                
            }            
            navigate(nav)            
        } catch (err) {
            seterr(err)
            toast.error(err?.response?.data?.message)
        } finally {
            setisLoading(false)
        }
    }

    return { Data, err, isLoading, fetchData }
}

export default useHandleCrud;