import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import './index.scss';

import { observer, inject } from 'mobx-react'
import Dialog from '../../../../components/dialog/index'

interface IProps extends RouteComponentProps {
    data: any,
    onWithRouter(obj: object): void,
    voteFree?(obj: object): string,
    voteCheck?(obj: object): string,
    isDialog?: boolean,
    updateDialog?(b: boolean): void
}

interface IState {
    isAlert: boolean,
    dialogData: {
        img: string,
        title: string,
        shareImg: boolean,
        content: string,
        success: boolean,
        onBayCount?(): void
    }
}

const isWeiXin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (/MicroMessenger/i.test(ua)) {
        return true;
    } else {
        return false;
    }
}


class VoteList extends React.Component<IProps, IState> {
    constructor(props: IProps, content: IState) {
        super(props, content);
        this.state = {
            isAlert: false,
            dialogData: {
                img: "",
                title: "",
                shareImg: false,
                content: "",
                success: false,
                onBayCount: () => {
                    alert('OK');
                    this.props.history.push('/Apply');
                }
            }
        }
        this.props.updateDialog && this.props.updateDialog(false);
    }

    voteClick = async (e: React.MouseEvent<HTMLAnchorElement & { dataset: { uid: string } }>) => {
        e.stopPropagation();
        var name = e.currentTarget.dataset.name
        const tuid = e.currentTarget.dataset.uid;
        if (isWeiXin()) {
            const code = this.props.voteFree && await this.props.voteFree({
                tid: String(window.localStorage.getItem("tid")),
                uid: window.localStorage["sfzvoteuid"],
                tuid: tuid
            });

            if (code == '0') {
                var c = `感谢您对${name}的支持，扫码下载十方舟短视频知识APP，学习更多的儿童课外辅导以及兴趣培养知识，您还有机会获得价值99元的VIP会员优惠券一张。`;
                this.setState({
                    isAlert: true,
                    dialogData: {
                        img: "",
                        title: "投票成功",
                        shareImg: false,
                        content: c,
                        success: true
                    }
                })
            } else {
                var c = "您的可投票次数已经达到上限";
                this.setState({
                    isAlert: true,
                    dialogData: {
                        img: "",
                        title: "非常抱歉",
                        shareImg: false,
                        content: c,
                        success: false
                    }
                })
            }
            this.props.updateDialog && this.props.updateDialog(true);
        } else {
            const code = this.props.voteCheck &&
                await this.props.voteCheck({ tid: String(window.localStorage.getItem("tid")) });
            if (code == '0') {
                window.localStorage.setItem('tuid', tuid);
                this.props.history.push('/Apply');
            }
        }
    };

    render() {
        const { data } = this.props;
        const dialogData = {
            img: this.state.dialogData.img,
            title: this.state.dialogData.title,
            shareImg: this.state.dialogData.shareImg,
            content: this.state.dialogData.content,
            success: this.state.dialogData.success,
            onBayCount: this.state.dialogData.onBayCount
        }
        return (
            <div>

                {this.props.isDialog ? <Dialog {...dialogData} /> : ""}
                {
                    data.map((item) => (
                        <div className="list-item" key={item.id}
                            onClick={(e) => {
                                this.props.onWithRouter(item);
                                e.stopPropagation();
                            }}>
                            <div className="item-content">
                                <div className="item-img">
                                    <img alt="" src={item.cover} />
                                    <div className="item-title">Top{item.ranking}</div>
                                </div>
                                <div className="ticket-number">
                                    <span>{item.id}号</span>
                                    <span>{item.voteNum}票</span>
                                </div>
                                <a className="btn-vote" onClick={this.voteClick} data-name={item.name} data-uid={item.uid}>
                                    为TA投票
                    </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default inject(({ signUp, home, dialog }) => ({
    voteCheck: signUp.voteCheck,
    voteFree: signUp.voteFree,
    data: home.listData,
    isDialog: dialog.isDialog,
    updateDialog: dialog.updateDialog
}))(observer(withRouter(VoteList)));