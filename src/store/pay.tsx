
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class Pay {

    @action.bound
    //微信内部支付
    async postSignUp(obj: Object) {
        const { data } = await axios.get(`businessh/entrying`);
        runInAction(() => {
            // this.messageCount = data.data;
        });
    }

}

export default new Pay();