
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class Pay {
    @observable WCPayPramas = {};

    @action.bound
    //微信内部支付
    async weChatPay(obj: { tid: string, uid: string, tuid: string, openId: string, orderType: string, voteNum: string }) {
        obj.openId = JSON.parse(obj.openId).val;
        const { data } = await axios.post(`wxpay/jsapi`, {
            payFlow: {
                tid: obj.tid,
                uid: obj.uid,
                tuid: obj.tuid,
                openId: obj.openId,
                orderType: obj.orderType,
                voteNum: obj.voteNum
            },
        });
        runInAction(() => {
            // this.WCPayPramas = data;
        });
        //@ts-ignore
        window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId": data.appId,                 //公众号名称，由商户传入     
                "timeStamp": String(data.timeStamp),         //时间戳，自1970年以来的秒数     
                "nonceStr": data.nonceStr,           //随机串     
                "package": data.package,
                "signType": data.signType,                   //微信签名方式：     
                "paySign": data.sign              //微信签名 
            },
            function (res) {
                if (res.err_msg == "get_brand_wcpay_request:ok") {
                    return "0";
                }
            });
        return '1'
    }

    @action.bound
    //微信浏览器外支付
    async weChatExternalPay(obj: { tid: string, tuid: string, voteNum: string }) {
        const { data } = await axios.post(`wxpay/toPay.html`, {
            payFlow: {
                tid: obj.tid,
                uid: "",
                tuid: obj.tuid,
                openId: "",
                orderType: "2",
                voteNum: obj.voteNum
            },
        });
        runInAction(() => {
            console.log(data);
        });
        return data;
    }

    @action.bound
    //alipay支付
    async aliExternalPay(obj: { tid: string, tuid: string, voteNum: string }) {
        const { data } = await axios.post(`alipay/toPay.html`, {
            payFlow: {
                tid: obj.tid,
                uid: "",
                tuid: obj.tuid,
                openId: "",
                orderType: "2",
                voteNum: obj.voteNum
            },
        });
        runInAction(() => {
            console.log(data);
        });
        return data;
    }
}

export default new Pay();