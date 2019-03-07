
import React, { Component } from 'react';
import { Flex, Radio } from 'antd-mobile';
import './index.scss';
export default class Paydialog extends Component {
    onChange = (value) => {
        console.log('checkbox');
        this.setState({
            value,
        });
    };
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
                    <div className="payply-pay">
                        <div>
                            <img src={require("../../static/images/zhifubao.png")} />
                            <span>支付宝支付</span>
                        </div>
                        <Radio className="my-radio" onChange={e => console.log('checkbox', e)}></Radio></div>
                    <p>确定支付￥<span>28</span></p>
                </div>
            </div>
        )
    }
}   