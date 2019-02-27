
import axios from 'axios';

//如果是开发环境
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = "https://cnodejs.org/api/v1";
} else {
    axios.defaults.baseURL = "https://cnodejs.org/api/v1";
}

axios.create({
    timeout: 5000
});

export default axios;