import { useEffect, useState } from "react";
import { AxiosRequest } from "./AxiosRequest";
import { useSelector } from "react-redux";

const useCustomFetch = ({ url, id }) => {
  const [result, setResult] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setisLoading(true);
        const res = await AxiosRequest.post(url, { userId: id });
        setResult(res?.data);
      } catch (error) {
        setError(error);
      } finally {
        setisLoading(false);
      }
    };

    fetchData();
  }, [url, id]);

  const Refetch = async () => {
    try {
      setisLoading(true);
      const res = await AxiosRequest.post(url, { userId: id });
      setResult(res?.data);
    } catch (error) {
      setError(error);
    } finally {
      setisLoading(false);
    }
  };

  return { result, error, isLoading, Refetch };
};

export default useCustomFetch;
