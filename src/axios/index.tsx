
import axios from 'axios';

//如果是开发环境
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = "https://www.nihaotime.com/timeVoting";
} else {
    axios.defaults.baseURL = "http://192.168.0.146:8080/voting/";
}

const http = axios.create({
    timeout: 5000
});



http.interceptors.request.use(
    config => {
        config.params = {
            token: localStorage.getItem("token")
        };
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);


//响应拦截器
http.interceptors.response.use(
    //@ts-ignore
    res => {
        return typeof res.data.data === "string" ?
            { data: res.data.data } :
            { data: { ...res.data.data } };
    },
    err => {
        return Promise.reject(err);
    }
);


export default http;