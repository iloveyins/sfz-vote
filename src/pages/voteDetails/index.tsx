
import React, { Component } from 'react';
import './index.scss';
import Paydialog from '../Apply/index';
import { wxInit } from '../../utils/wxShare'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps, withRouter } from 'react-router';

import Dialog from '../../components/dialog/index'

export interface IProps extends RouteComponentProps {
    detial: object,
    show: boolean,
    itemDetails: {
        age: number
        ageRegion: string
        birthday: string
        captcha: string
        cover: string
        createTime: string
        declaration: string
        describeInfo: string
        entryType: string
        id: number
        linkPhone: string
        name: string
        photoShow: string
        ranking: 0
        sex: string
        status: string
        tid: string
        uid: string
        videoShow: string
        voteNum: string
    },
    entryInfo(obj: object): void,
    voteFree?(obj: object): string,
    voteCheck?(obj: object): string,
    isDialog?: boolean,
    updateDialog?(b: boolean): void,
    onBayCount?(): void
}

export interface IState {
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

class VoteDetails extends Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            isAlert: false,
            dialogData: {
                img: "",
                title: "",
                shareImg: false,
                content: "",
                success: false,
                onBayCount: () => {

                }
            }
        }
        this.props.updateDialog && this.props.updateDialog(false);
    }

    getentryInfo = async () => {
        const params = new URLSearchParams(this.props.location.search);
        const r = await this.props.entryInfo({ tid: params.get("tid"), uid: params.get("uid") });
        wxInit(
            this.props.itemDetails.name,
            window.location.href,
            this.props.itemDetails.cover,
            this.props.itemDetails.declaration);
    }

    componentDidMount() {
        this.getentryInfo();
    }

    render() {
        const voteClick = async (e: React.MouseEvent<HTMLAnchorElement & { dataset: { uid: string } }>) => {
            e.stopPropagation();
            const tuid = e.currentTarget.dataset.uid;
            if (isWeiXin()) {
                const code = this.props.voteFree && await this.props.voteFree({
                    tid: window.localStorage["tid"],
                    uid: window.localStorage["sfzvoteuid"],
                    tuid: tuid
                });
                if (code == '0') {
                    var c = `感谢您对${this.props.itemDetails.name}的支持，扫码下载十方舟短视频知识APP，学习更多的儿童课外辅导以及兴趣培养知识，您还有机会获得价值99元的VIP会员优惠券一张。`
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
                    var c = "您的可投票次数已经达到上限"
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
                const code = this.props.voteCheck && await this.props.voteCheck({ tid: window.localStorage.getItem("tid") });
                if (code == '0') {
                    this.props.history.push('/Apply');
                    window.localStorage.setItem('tuid', tuid);
                }
            }
        };
        const { itemDetails } = this.props;
        return (
            <div className="knowledge-details">
                {this.props.isDialog ? <Dialog {...this.state.dialogData} /> : ""}
                <div className="detail-background">
                    <section className="detial-top">
                        <div className="img-wrap">
                            <img className="img-content" src={itemDetails.cover} />
                            {/* <img className="img-icon" src={data.medal} /> */}
                        </div>
                        <div className="voting-wrap">
                            <div>
                                <p>{itemDetails.id}</p>
                                <p>编号</p>
                            </div>
                            <div>
                                <p>{itemDetails.voteNum}</p>
                                <p>总票数</p>
                            </div>
                            <div>
                                <p>{itemDetails.ranking}</p>
                                <p>排名</p>
                            </div>
                            {/* <div>
                                <p>{itemDetails.ranking}</p>
                                <p>距上差距</p>
                            </div> */}
                        </div>
                    </section>
                    <section className="detial-center">
                        <div>
                            <p>参赛宣言：{itemDetails.declaration}</p>
                        </div>
                        {
                            Boolean(itemDetails.entryType === '1') ?
                                <div className="declaration-detail">
                                    <p>类型：{itemDetails.entryType == '1' ? "个人" : "团队"}</p>
                                    <p>姓名：{itemDetails.name}</p><p>性别：{itemDetails.sex}</p><p>年龄范围：{itemDetails.age}</p>
                                </div>
                                :
                                <div className="declaration-detail">
                                    <p>类型：{itemDetails.entryType}</p>
                                    <p>团队名称：{itemDetails.name}</p><p>年龄范围：{itemDetails.ageRegion}</p>
                                </div>
                        }
                    </section>
                    <p className="dashed-style"></p>
                    <section className="detial-footer">
                        <span onClick={voteClick} data-uid={itemDetails.uid}>为TA投票</span>
                        <span onClick={() => {
                            this.props.history.push('/')
                        }}>关闭</span>
                    </section>
                    <section className="bottom-empty"></section>
                </div>
            </div>
        )
    }
}

export default inject(({ signUp, home, dialog }) => ({
    voteCheck: signUp.voteCheck,
    voteFree: signUp.voteFree,
    itemDetails: home.itemDetails,
    entryInfo: home.entryInfo,
    isDialog: dialog.isDialog,
    updateDialog: dialog.updateDialog
}))(observer(withRouter(VoteDetails)));