
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';
import { string } from 'prop-types';

configure({ enforceActions: "observed" })


class Pay {

    @action.bound
    //微信内部支付
    async weChatPay(obj: Object) {
        const { data } = await axios.post(`wxpay/jsapi`);
        runInAction(() => {

        });
        return data;
    }

    @action.bound
    //微信浏览器外支付
    async weChatExternalPay() {
        const { data } = await axios.post(`wxpay/toPay.html`, {
            payFlow: {
                tid: "22472da731a9404abb4001723da73ab9",
                uid: "",
                tuid: "c9a2644623204ac7bf7de4e681832058",
                openId: "",
                orderType: "2",
                voteNum: "10"
            },
        });
        runInAction(() => {
            console.log(data);
        });
        return data;
    }
}

export default new Pay();