
import React, { Component } from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Modal } from 'antd-mobile';
import { Link } from 'react-router-dom';

interface IProps {
    img: string,
    title: string,
    shareImg: boolean,
    content: string,
    success: boolean,
    voteNum: number,
    onCloseClick?(): void,
    updateTobepaid?(b: boolean): void,
    weChatPay?(obj: object): string,
    updateDialog?(b: boolean): void,
}
function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}
class Tobepaid extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.state.modal1 = true;

    }
    componentDidMount() {

    }

    state = {
        modal1: false,
        modal2: false,
    };

    onBugCount = () => {
        //this.props.history.push('Apply');
    }
    onClose = key => () => {
        this.setState({
            [key]: false,
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }

    onWeixinJSBridge() {
        //@ts-ignore
        if (typeof window.WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                //@ts-ignore
            } else if (document.attachEvent) {
                //@ts-ignore
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                //@ts-ignore
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        } else {
            this.onBridgeReady();
        }
    }

    onBridgeReady = async () => {
        const r = this.props.weChatPay && await this.props.weChatPay({
            tid: window.localStorage.getItem("tid"),
            uid: window.localStorage.getItem('sfzvoteuid'),
            tuid: "",
            openId: window.localStorage.getItem('sfzvoteappId'),
            orderType: "1",
            voteNum: this.props.voteNum
        });
        if (r == '0') {
            this.setState({
                dialogData: {
                    img: "",
                    title: "恭喜您！报名成功",
                    shareImg: false,
                    content: "1-2个工作日审核通过后，会在投票页显示，并发送短信提示哦~",
                    success: true
                }
            })
            this.props.updateDialog && this.props.updateDialog(true);
        }
        else {
            this.setState({
                dialogData: {
                    img: "",
                    title: "报名失败",
                    shareImg: false,
                    content: "请支付订单",
                    success: false
                }
            })
            this.props.updateDialog && this.props.updateDialog(true);
        }
    }

    render() {
        const { success, title, content, shareImg } = this.props;
        return (
            <Modal
                visible={this.state.modal1}
                transparent
                maskClosable={false}
                onClose={this.onClose('modal1')}
                // title="Title"
                // footer={[{ text: 'Ok', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            // afterClose={() => { alert('afterClose'); }}
            >
                <div className="dialog-detial">
                    <div className="dialog-wrap">
                        <div className="voting-detial">
                            <div className="voting-wrap">
                                {
                                    success ? <img className="first-img" src={require('../../static/images/success@3x.png')} />
                                        : <img className="first-img" src={require('../../static/images/failure@3x.png')} />
                                }

                                <p className="voting-title">{title}</p>
                                <p className="voting-content">{content}</p>
                                {
                                    Boolean(shareImg) ?
                                        <div className="logo-img">
                                            <img src={require('../../static/images/code.png')} />
                                        </div> : ""
                                }
                                <div className="detial-footer">
                                    <span className="buyGl" onClick={this.onWeixinJSBridge}>去支付</span>
                                    <span onClick={() => {
                                        this.props.updateTobepaid && this.props.updateTobepaid(false);
                                    }}>
                                        关闭</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </Modal>
        )
    }
}

export default inject(({ dialog, pay }) => ({
    updateTobepaid: dialog.updateTobepaid,
    weChatPay: pay.weChatPay,
    updateDialog: dialog.updateDialog,
}))(observer(Tobepaid));