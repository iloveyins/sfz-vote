
import React, { Component } from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router';
import { Modal } from 'antd-mobile';
interface IProps extends RouteComponentProps {
    img: string,
    title: string,
    shareImg: string,
    content: string,
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
export default class VotingDialog extends React.Component<IProps> {
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
        this.props.history.push('Apply');
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
        const { location: { state: { title, content, shareImg, success } } } = this.props;
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
                                {success ? <img className="first-img" src={require('../../static/images/success@3x.png')} />
                                    : <img className="first-img" src={require('../../static/images/failure@3x.png')} />}

                                <p className="voting-title">{title}</p>
                                <p className="voting-content">{content}</p>
                                {
                                    Boolean(shareImg) ?
                                        <div className="logo-img">
                                            <img src={require('../../static/images/code.png')} />
                                        </div> : ""
                                }
                                <div className="detial-footer">
                                    <span onClick={this.onBugCount}>购买给力值</span>
                                    <span onClick={
                                        () => {
                                            this.props.history.push('/');
                                        }}>返回</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </Modal>
        )
    }
}
