import axios from 'axios'

export const AxiosRequest = axios.create({
    baseURL: "http://localhost:8080/api/"
})