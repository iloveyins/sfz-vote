
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class Pay {
    @observable WCPayPramas = {};

    @action.bound
    //微信内部支付
    async weChatPay(obj: { tid: string, uid: string, tuid: string, openId: string, orderType: string, voteNum: string }) {
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
            //@ts-ignore
            window.WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": data.appId,                 //公众号名称，由商户传入     
                    "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数     
                    "nonceStr": data.nonceStr,           //随机串     
                    "package": "prepay_id=u802345jgfjsdfgsdg888",
                    "signType": "MD5",                   //微信签名方式：     
                    "paySign": data.paySign              //微信签名 
                },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    }
                });
            this.WCPayPramas = data;
        });
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