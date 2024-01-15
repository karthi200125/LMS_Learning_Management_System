import { useEffect, useState } from "react";
import handleRequest from "./Handlerequest";

const useCustomFetch = ({ userId, url, data }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("access_token");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await handleRequest({
        url,
        method: "POST",
        data,
        userId,
        token,
      });
      setResult(res);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, url, data, token]);

  return { result, error, isLoading, fetchData };
};

export default useCustomFetch;
