
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
    isClosePay?(): void
}

class Apply extends React.Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            isAlert: false,
            price: 0,
            payCount: 0,
            isClosePay: () => {
                this.setState({ isAlert: false })
            }
        }
    }

    render() {
        let pay = {
            price: this.state.price,
            payCount: this.state.payCount,
            isClosePay: this.state.isClosePay
        }

        return (
            <div id="apply">
                {
                    //@ts-ignore
                    this.state.isAlert ? <Paydialog {...pay} /> : ""
                }
                <div className="apply-wrap">
                    <div className="apply-money">
                        <div className="money-count">
                            <div className="money-quota">
                                <p>加油</p>
                                <p>10元</p>
                            </div>
                            <div className="money-content">
                                <div className="money-text">
                                    <p>内容：10元10加油</p>
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
                                <p>给力</p>
                                <p>50元</p>
                            </div>
                            <div className="money-content">
                                <div className="money-text">
                                    <p>内容：50元55给力</p>
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
                                <p>人气</p>
                                <p>100元</p>
                            </div>
                            <div className="money-content">
                                <div className="money-text">
                                    <p>内容：100元120人气</p>
                                    <p>金额：100元</p>
                                </div>
                                <p className="pay-button" onClick={() => {
                                    this.setState({
                                        isAlert: true,
                                        price: 100,
                                        payCount: 120
                                    });
                                }}>在线支付</p>
                            </div>
                        </div>
                    </div>
                    <div className="introduct">
                        <p>说明</p>
                        <p>1、给力值次数有效期，自购买日起至活动结束为止</p>
                        <p>2、每用户只可选购一种</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Apply);