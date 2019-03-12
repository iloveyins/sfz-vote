
import React, { Component } from 'react';
import { Flex, Radio } from 'antd-mobile';
import './index.scss';
import { inject, observer, propTypes } from 'mobx-react';

interface IProps {
    price: number,
    payCount: number,
    weChatExternalPay?(obj: {}): string,
    weChatPay?(obj: {}): string
}

@inject(({ pay, status }) => ({
    loading: status.loading,
    setLoading: status.setLoading,
    weChatExternalPay: pay.weChatExternalPay,
    weChatPay: pay.weChatPay
}))

@observer
export default class Paydialog extends React.Component<IProps>{

    state = {
        value: 1
    }
    constructor(props: IProps) {
        super(props);
    }

    isWeiXin = () => {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (/MicroMessenger/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    }

    //微信
    onWeChatExternalPay = async () => {


        if (!this.isWeiXin()) {

            var tid = window.localStorage.getItem('tid') ?
                String(window.localStorage.getItem('tid')) : "";

            var s = this.props.weChatExternalPay &&
                await this.props.weChatExternalPay({
                    tid: tid,
                    voteNum: this.props.payCount,
                    tuid: window.localStorage.getItem('tuid')
                });
            s && (window.location.href = s);
        } else {
            this.props.weChatPay && await this.props.weChatPay({
                tid: window.localStorage.getItem('tid'),
                uid: window.localStorage.getItem('sfzvoteuid'),
                tuid: "",
                openId: window.localStorage.getItem('sfzvoteappId'),
                orderType: this.state.value,
                voteNum: this.props.payCount
            });
            // r && (window.location.href = r);
        }
    }

    //支付宝
    onWeAlipExternalPay = async () => {
        if (!this.isWeiXin()) {
            //@ts-ignore
            window.location.href = 'https://excashier.alipay.com/standard/auth.htm?payOrderId=34654654'
        } else {
            alert("请在浏览器打开，进行支付！")
        }
    }

    render() {
        return (
            <div className="pay-dialog">
                <div className="pay-detial">
                    <p>支付方式</p>
                    <div className="wechat-pay">
                        <div>
                            <img src={require("../../static/images/weixinzhifu.png")} />
                            <span>微信支付</span>
                        </div>
                        <Radio className="my-radio" key={1} checked={this.state.value === 1} defaultChecked onChange={() => {
                            this.setState({ value: 1 });
                        }}>
                        </Radio>
                    </div>

                    <div className="payply-pay">
                        <div>
                            <img src={require("../../static/images/zhifubao.png")} />
                            <span>支付宝支付</span>
                        </div>
                        <Radio className="my-radio" key={2} checked={this.state.value === 2} onChange={() => {
                            this.setState({ value: 2 });
                        }}>
                        </Radio>
                    </div>

                    <p onClick={() => {
                        this.state.value === 1 ? this.onWeChatExternalPay() : this.onWeAlipExternalPay()
                    }}>
                        确定支付￥
                        <span>{this.props.price}</span>
                    </p>
                </div>
            </div>
        )
    }
}   