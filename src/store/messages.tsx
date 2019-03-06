
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class Messages {
    @observable messages = [];
    @observable messageCount = 0;

    @action.bound
    async getMessageCount() {
        const { data } = await axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx615e5ac092e9c376&secret=SECRET&code=CODE&grant_type=authorization_code`);
        runInAction(() => {
            alert(data);
            // this.messageCount = data.data;
            this.messageCount = 333;
        });
    }
}

export default new Messages();