import React from 'react';
// import {Toast}  from '../../componets/index';
import './index.scss';
import { Paydialog } from '../../components/index';
import { string } from 'prop-types';
import { withRouter, RouteComponentProps } from 'react-router';

export interface IProps extends RouteComponentProps {
	name: string;
	show: boolean;
}

export interface IState {
	isAlert: boolean;
	price: number;
	payCount: number;
	isClosePay?(): void;
}

class Apply extends React.Component<IProps, IState> {
	constructor(props: IProps, context: IState) {
		super(props, context);
		this.state = {
			isAlert: false,
			price: 0,
			payCount: 0,
			isClosePay: () => {
				this.setState({ isAlert: false });
			}
		};
	}

	render() {
		let pay = {
			price: this.state.price,
			payCount: this.state.payCount,
			isClosePay: this.state.isClosePay
		};

		return (
			<div id="apply">
				{
					//@ts-ignore
					this.state.isAlert ? <Paydialog {...pay} /> : ''}
				<div className="apply-wrap">
					<div className="apply-money">
						<div className="money-count">
							<div className="money-quota">
								<img src={require('../../static/images/鲜花@3.png')} alt="" />
								<p>鲜花</p>
							</div>
							<div className="money-content">
								<div className="money-text">
									<p>
										<strong></strong> 鲜花
									</p>
								</div>
								<p
									className="pay-button"
									onClick={() => {
										this.setState({
											isAlert: true,
											price: 1,
											payCount: 1
										});
									}}
								>
									在线支付
								</p>
							</div>
						</div>
					</div>
					<div className="apply-money">
						<div className="money-count">
							<div className="money-quota">
								<img src={require('../../static/images/幸运星@3.png')} alt="" />
								{/* <p>幸运星</p> */}
							</div>

							<div className="money-content">
								<div className="money-text">
									<p>
										<strong></strong> 幸运星
									</p>
								</div>
								<p
									className="pay-button"
									onClick={() => {
										this.setState({
											isAlert: true,
											price: 5,
											payCount: 6
										});
									}}
								>
									在线支付
								</p>
							</div>
						</div>
					</div>
					<div className="apply-money">
						<div className="money-count">
							<div className="money-quota">
								<img src={require('../../static/images/闪耀蓝钻@3.png')} alt="" />
								<p>闪耀蓝钻</p>
							</div>
							<div className="money-content">
								<div className="money-text">
									<p>
										<strong></strong> 闪耀蓝钻
									</p>
								</div>
								<p
									className="pay-button"
									onClick={() => {
										this.setState({
											isAlert: true,
											price: 10,
											payCount: 12
										});
									}}
								>
									在线支付
								</p>
							</div>
						</div>
					</div>
					<div className="introduct">
						<p>说明</p>
						<p>1、鲜花代表的票数是1次</p>
						<p>2、幸运星代表的票数是6次</p>
						<p>3、闪耀蓝钻代表的票数是12次</p>
						<p>4、给力值次数有效期，自购买日起至活动结束为止</p>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(Apply);
