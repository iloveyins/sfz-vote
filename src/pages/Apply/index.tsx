
import React from 'react';
// import {Toast}  from '../../componets/index';
import './index.scss';
import { Paydialog } from '../../components/index'
import { string } from 'prop-types';
import { withRouter, RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps {
    name: string;
    show: boolean;
}

export interface IState {
    isAlert: boolean,
    price: number,
    payCount: number
}

class Apply extends React.Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            isAlert: false,
            price: 0,
            payCount: 0
        }
    }

    render() {
        let pay = {
            price: this.state.price,
            payCount: this.state.payCount
        }

        return (
            <div id="apply">
                {
                    this.state.isAlert ? <Paydialog {...pay} /> : ""
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
                                            isAlert: true,
                                            price: 10,
                                            payCount: 10
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
                                    this.setState({
                                        isAlert: true,
                                        price: 50,
                                        payCount: 55
                                    });
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
                                <p className="pay-button" onClick={() => {
                                    this.setState({
                                        isAlert: true,
                                        price: 120,
                                        payCount: 100
                                    });
                                }}>在线支付</p>
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

export default withRouter(Apply);