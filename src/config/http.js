import axios from 'axios';

const instance = axios.create({
    // baseURL: 'api/',
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use((response) => {
    if (response.data.iRet !== 1) {
        console.error('API 返回错误码', response.data.iRet, response.data.info);
    }
    return response.data.data;
}, (error) => {
    console.error('API 连接错误', Error);
    return Promise.reject(error);
});

export default instance;
