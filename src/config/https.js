import axios from 'axios';

const request = axios.create({
    // baseURL: 'api/',
});

request.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

request.interceptors.response.use((response) => {
    if (response.data.iRet !== 1) {
        console.error('API 返回错误码', response.data.iRet, response.data.info);
    }
    return response.data;
}, (error) => {
    console.error('API 连接错误', Error);
    return Promise.reject(error);
});

export default request;
