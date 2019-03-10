
import React from 'react';
// import {Toast}  from '../../componets/index';
import './index.scss';
import { Paydialog } from '../../components/index'
import { string } from 'prop-types';

export interface IProps {
    name: string;
    show: boolean;
}

export interface IState {
    isAlert: boolean
}

export default class Apply extends React.Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            isAlert: false
        }
    }

    render() {
        let self = this;
        const data = {
            img: '',
            title: '',
            shareImg: '',
            content: '',
            onBugCount() {
                self.setState({ isAlert: false })
            },
        }

        return (
            <div id="apply">
                {
                    this.state.isAlert ? <Paydialog /> : ""
                }
                <div className="apply-wrap">
                    <div className="apply-money">
                        <div className="money-count">
                            <div className="money-quota">
                                <p>10次投票机会</p>
                                <p>10元</p>
                            </div>
                            <div className="money-content">
                                <div className="money-text">
                                    <p>内容：每人每天投票10次</p>
                                    <p>金额：10元</p>
                                </div>
                                <p className="pay-button"
                                    onClick={() => {
                                        this.setState({
                                            isAlert: true
                                        })
                                    }}>在线支付</p>
                            </div>
                        </div>
                    </div>
                    <div className="apply-money">
                        <div className="money-count">
                            <div className="money-quota">
                                <p>55次投票机会</p>
                                <p>50元</p>
                            </div>
                            <div className="money-content">
                                <div className="money-text">
                                    <p>内容：每人每天投票55次</p>
                                    <p>金额：50元</p>
                                </div>
                                <p className="pay-button" onClick={() => {
                                    this.setState({ isAlert: true });
                                }}>在线支付</p>
                            </div>
                        </div>
                    </div>
                    <div className="apply-money">
                        <div className="money-count">
                            <div className="money-quota">
                                <p>120次投票机会</p>
                                <p>100元</p>
                            </div>
                            <div className="money-content">
                                <div className="money-text">
                                    <p>内容：每人每天投票120次</p>
                                    <p>金额：100元</p>
                                </div>
                                <p className="pay-button">在线支付</p>
                            </div>
                        </div>
                    </div>
                    <div className="introduct">
                        <p>说明</p>
                        <p>1、投票次数有效期，自购买日起至活动结束为止</p>
                        <p>2、每用户只可选购一种</p>
                    </div>
                </div>
            </div>
        )
    }
}