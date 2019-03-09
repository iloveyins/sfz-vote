
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
    }

    @action.bound
    //微信浏览器外支付
    async weChatExternalPay() {
        const { data } = await axios.get(`wxpay/toPay.html?`, {
            params: {
                tid: "22472da731a9404abb4001723da73ab9",
                uid: "",
                tuid: "c9a2644623204ac7bf7de4e681832058",
                openId: "",
                orderType: 2,
                voteNum: "10"
            }
        });
        runInAction(() => {

            console.log(data);
            
            var appId = data.appId;
            var secret = data.secretKey;
            var activityUid = data.activityUid;
            var redirectUrl = data.redirectUrl;

            // var redirectUrl = "https://www.nihaotime.com/timeManger/common/share/normal/"+activityUid;
            redirectUrl = encodeURIComponent(redirectUrl);
            var redurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + redirectUrl + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            // location.href = redurl;
        });
    }
}

export default new Pay();