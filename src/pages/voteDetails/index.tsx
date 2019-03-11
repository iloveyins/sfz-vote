
import React, { Component } from 'react';
import './index.scss';
import Paydialog from '../Apply/index';
import { wxInit } from '../../utils/wxShare'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router';

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
}

export interface IState {
    isAlert: boolean
}


class VoteDetails extends Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            isAlert: false
        }

    }

    componentDidMount() {
        const params = new URLSearchParams(this.props.location.state);
        this.props.entryInfo({ tid: params.get("tid"), uid: params.get("uid") });

        wxInit(
            this.props.itemDetails.name,
            window.location.href,
            this.props.itemDetails.cover,
            this.props.itemDetails.declaration);
    }

    render() {



        let self = this;
        const dataDetail = {
            img: '',
            title: '',
            shareImg: '',
            content: '',
            onBugCount() {
                self.setState({ isAlert: false })
            }
        }

        const { itemDetails } = this.props;
        return (
            <div className="knowledge-details">
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
                        <span onClick={() => {
                        }}>为TA投票</span>
                        <span>分享拉票</span>
                    </section>
                </div>
            </div>
        )
    }
}

export default inject(({ home, status }) => ({
    itemDetails: home.itemDetails,
    entryInfo: home.entryInfo,

}))(observer(VoteDetails));