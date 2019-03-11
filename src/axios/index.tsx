
import axios from 'axios';
import { string } from 'prop-types';

//如果是开发环境
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = "http://192.168.0.146:8080/timeVoting";
} else {
    axios.defaults.baseURL = "https://www.nihaotime.com/timeVoting/";
    // axios.defaults.baseURL = "http://192.168.0.146:8080/timeVoting/";
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

        if (typeof res.data == "string") {
            console.log(res.data)
            return res;
        }
        if (res.data.code == 0) {
            return res.data.data === null ?
                { data: res.data } :
                { data: { ...res.data.data } };
        } else {
            alert(res.data.msg);
            return Promise.reject();
        }
    },
    err => {
        return Promise.reject(err);
    }
);


export default http;