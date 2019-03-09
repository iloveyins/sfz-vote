import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import './index.scss';
import VoteDetails from '../../../voteDetails/index';

import { observer, inject } from 'mobx-react'
import { async } from 'q';

interface IProps extends RouteComponentProps {
    data: any,
    onWithRouter(obj: object): void,
    voteFree?(obj: object): void,
    voteCheck?(obj: object): string,
    isVote: boolean
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

const getUrl = (name) => {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    console.log(r);

    if (r != null) return unescape(r[2]); return null;
}

const VoteList = (props: IProps) => {

    const { data, onWithRouter, voteFree, voteCheck } = props;

    const voteClick = async(e: React.MouseEvent<HTMLAnchorElement & {dataset: {uid: string}}>) => {
        e.stopPropagation();
        if (isWeiXin()) {
            voteFree && voteFree({ tid: getUrl('tid'), uid: window.localStorage["sfzvoteuid"], tuid: e.currentTarget.dataset.uid });
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
    isVote: signUp.isVote
}))(observer(withRouter(VoteList)));