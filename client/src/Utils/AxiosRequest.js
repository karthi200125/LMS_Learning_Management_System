import axios from 'axios'

export const AxiosRequest = axios.create({
    baseURL: "https://lmsplatform.onrender.com/api/"
})

