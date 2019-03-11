

import React from 'react';


import { Modal } from 'antd-mobile';
import { RouteComponentProps } from 'react-router-dom';


interface IState {
}

interface IProps extends RouteComponentProps {
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
export default class PaySuccess extends React.Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props);
    }
    state = {
        modal1: true,
        modal2: false,
    };
    componentDidMount() {
        setTimeout(() => {
            // this.onClose("modal1");
            this.props.history.push('/');
        }, 2000);
    }
    showModal = key => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        this.setState({
            [key]: true,
        });
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

        return (
            <div >
                <Modal

                    visible={this.state.modal1}
                    maskClosable={false}
                    onClose={this.onClose('modal1')}
                    title="操作提示"
                    footer={[{ text: '确认', onPress: () => { console.log('ok'); this.onClose('modal1')(); } }]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                // afterClose={() => {  }}
                >
                    <div style={{ height: 100, overflow: 'scroll' }}>
                        操作成功,正在跳转...
                    </div>
                </Modal>
            </div>
        )
    }
}