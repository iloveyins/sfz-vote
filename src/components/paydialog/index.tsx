
import React, { Component } from 'react';
import { Flex, Radio } from 'antd-mobile';
import './index.scss';
import { inject, observer, propTypes } from 'mobx-react';

interface IProps {
    weChatExternalPay?(): string,
    weChatPay?(): string
}

@inject(({ pay, status }) => ({
    loading: status.loading,
    setLoading: status.setLoading,
    weChatExternalPay: pay.weChatExternalPay,
    weChatPay: pay.weChatPay
}))

@observer
export default class Paydialog extends React.Component<IProps>{
    onChange = (value) => {
        console.log('checkbox');
        this.setState({
            value,
        });
    };
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
    onWeChatExternalPay = async () => {
        if (!this.isWeiXin()) {
            var s = this.props.weChatExternalPay && await this.props.weChatExternalPay();
            // window.location.href = s ;
            window.open(s);
        } else {
            var r = this.props.weChatPay && await this.props.weChatPay();
            window.open(r);
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
                        <Radio className="my-radio" defaultChecked onChange={e => console.log('checkbox', e)}></Radio>
                    </div>
                    {
                        /* <div className="payply-pay">
                        <div>
                            <img src={require("../../static/images/zhifubao.png")} />
                            <span>支付宝支付</span>
                        </div>
                        <Radio className="my-radio" onChange={e => console.log('checkbox', e)}></Radio></div> */
                    }
                    <p onClick={this.onWeChatExternalPay}>
                        确定支付￥
                    <span>28</span></p>
                </div>
            </div>
        )
    }
}   