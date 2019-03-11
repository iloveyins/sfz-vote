import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import './index.scss';
import VoteDetails from '../../../voteDetails/index';

import { observer, inject } from 'mobx-react'
import { async } from 'q';

interface IProps extends RouteComponentProps {
    data: any,
    onWithRouter(obj: object): void,
    voteFree?(obj: object): string,
    voteCheck?(obj: object): string,
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

const VoteList = (props: IProps) => {

    const { data, onWithRouter, voteFree, voteCheck } = props;

    const location = new URLSearchParams(props.location.search);

    const voteClick = async (e: React.MouseEvent<HTMLAnchorElement & { dataset: { uid: string } }>) => {
        e.stopPropagation();
        if (isWeiXin()) {
            const code = voteFree && await voteFree({
                tid: location.get('tid'),
                uid: window.localStorage["sfzvoteuid"], tuid: e.currentTarget.dataset.uid
            });
            if (code === '0') {
                var c = "感谢您对“xxx”的支持，扫码下载十方舟短视频知识APP，学习更多的儿童课外辅导以及兴趣培养知识，您还有机会获得价值99元的VIP会员优惠券一张。"
                props.history.push({
                    pathname: '/votingDialog',
                    state: {
                        content: c,
                        title: "投票成功",
                        success: true,
                        shareImg: true
                    }
                })
            } else {
                var c = "您的可投票次数已经达到上限"
                props.history.push({
                    pathname: '/votingDialog',
                    state: {
                        content: c,
                        title: "非常抱歉",
                        success: false
                    }
                })
            }
        } else {
            const code = voteCheck && await voteCheck({ tid: '22472da731a9404abb4001723da73ab9' });
            if (code === '0') {
                props.history.push('Apply');

            }
        }
    };

    return (
        data.map((item) => (
            <div className="list-item" key={item.id}
                onClick={(e) => {
                    onWithRouter(item);
                    e.stopPropagation();
                }}>
                <div className="item-content">
                    <div className="item-img">
                        <img alt="" src={require('../../../../static/images/banner.png')} />
                        <div className="item-title">Top{item.ranking}</div>
                    </div>
                    <div className="ticket-number">
                        <span>{item.id}号</span>
                        <span>{item.voteNum}票</span>
                    </div>
                    <a className="btn-vote" onClick={voteClick} data-uid={item.uid}>
                        为TA投票
                </a>
                </div>
            </div>
        ))
    )
}

export default inject(({ signUp, home, status }) => ({
    voteCheck: signUp.voteCheck,
    voteFree: signUp.voteFree,
    data: home.listData,
}))(observer(withRouter(VoteList)));