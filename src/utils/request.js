import axios from "axios"
import { constants } from "../utils/constants";

const request = axios.create({
    baseURL: constants.REACT_APP_BASE_URL,
    timeout: 5000,
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    alert(error);
    return Promise.reject(error);
});

// Add a response interceptor
request.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    alert(error);
    // Do something with response error
    return Promise.reject(error);
});


export default request;