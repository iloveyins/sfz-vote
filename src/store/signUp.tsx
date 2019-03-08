
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class signUp {

    @action.bound
    //提交报名
    async postSignUp(obj: Object) {
        const { data } = await axios.get(`businessh/entrying`);
        runInAction(() => {
            // this.messageCount = data.data;
        });
    }

    @action.bound
    //发送验证码 
    async sendCaptcha(obj: Object) {
        const { data } = await axios.get(`commonh/sendCaptcha`);
        runInAction(() => {
            // this.messageCount = data.data;
        });
    }

    @action.bound
    //验证用户是否可报名以及参赛状态
    async entryCheck(obj: Object) {
        const { data } = await axios.get(`businessh/entryCheck`);
        runInAction(() => {
            // this.messageCount = data.data;
        });
    }

    @action.bound
    //验证用户是否可报名以及参赛状态（非微信）
    async voteCheck(obj: Object) {
        const { data } = await axios.get(`commonh/voteCheck`);
        runInAction(() => {
            // this.messageCount = data.data;
        });
    }

    @action.bound
    //验证用户是否可报名以及参赛状态（微信）
    async voteFree(obj: { tid: string, uid: string, tuid: string }) {
        const { data } = await axios.get(`businessh/voteFree `);
        runInAction(() => {
            // this.messageCount = data.data;
        });
    }

}

export default new signUp();