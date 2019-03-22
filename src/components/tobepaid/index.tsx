
import React, { Component } from 'react';
import './index.scss';
import { inject, observer } from 'mobx-react';
import { Modal } from 'antd-mobile';

interface IProps {
    img: string,
    title: string,
    shareImg: boolean,
    content: string,
    success: boolean,
    voteNum: number,
    onTobepaidClose?(): void,
    onCloseClick?(): void,
    updateTobepaid?(b: boolean): void,
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
                                    <span className="buyGl" onClick={() => {
                                        this.props.updateTobepaid && this.props.updateTobepaid(false);
                                        // this.onWeixinJSBridge();
                                        this.props.onTobepaidClose && this.props.onTobepaidClose();
                                    }}>去支付</span>
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
    updateDialog: dialog.updateDialog,
}))(observer(Tobepaid));