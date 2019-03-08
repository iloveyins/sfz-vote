
import axios from 'axios';

//如果是开发环境
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = "https://www.10fangzhou.com/timeKnowledge/";
} else {
    axios.defaults.baseURL = "http://192.168.0.146:8080/voting/";
}

axios.create({
    timeout: 5000
});
export default axios;