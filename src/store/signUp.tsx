
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class signUp {
    @observable iSCaptcha = true;

    //活动是否有效
    @observable isVote = false;

    @action.bound
    //提交报名
    async postSignUp(obj: FormData) {

        const { data } = await axios.post(
            `businessh/entrying`,
            obj,
            {
                headers: {
                    "Content-Type": 'application/x-www-form-urlencoded'
                },
            }
        );
        runInAction(() => {
            console.log(data);
        });
    }

    @action.bound
    //发送验证码 
    async sendCaptcha(obj: { sendType: number, phoneNum: string }) {
        const { data } = await axios.post(`commonh/sendCaptcha`, obj);
        runInAction(() => {
            this.iSCaptcha = data;
        });
    }

    @action.bound
    //验证用户是否可报名以及参赛状态
    async entryCheck(obj: Object) {
        const { data } = await axios.post(`businessh/entryCheck`);
        runInAction(() => {
        });
    }

    @action.bound
    //验证用户是否可报名以及参赛状态（非微信）
    async voteCheck(obj: Object) {
        const { data } = await axios.post(`commonh/voteCheck`, obj);
        runInAction(() => {
            data.code == '0' ? this.isVote = true : this.isVote = false;
            console.log('isVote 修改完毕', this.isVote);
        });
        return data.code;
    }

    @action.bound
    //验证用户是否可报名以及参赛状态（微信）
    async voteFree(obj: { tid: string, uid: string, tuid: string }) {
        const { data } = await axios.post(`businessh/voteFree `, obj);
        runInAction(() => {

        });
    }
}

export default new signUp();