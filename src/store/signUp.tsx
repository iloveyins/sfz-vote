
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class signUp {

    @action.bound
    //提交报名
    async postSignUp(obj: Object) {
        // const { data } = await axios.get(`"`);
        runInAction(() => {
            // this.messageCount = data.data;
        });
    }
}

export default new signUp();