import React from 'react';
import { withRouter, RouteComponentProps } from "react-router-dom";
import './index.scss';
import VoteDetails from '../../../voteDetails/index';

import { observer, inject } from 'mobx-react'

interface IProps extends RouteComponentProps {
    data: any,
    onWithRouter(obj: object): void,
    voteFree(obj: object): void,
    voteCheck(obj: object): void,
    isVote: boolean
}

const isWeiXin = () => {
    //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
    var ua = window.navigator.userAgent.toLowerCase();
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    //@ts-ignore
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
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

    const { data, onWithRouter, voteFree, voteCheck, isVote } = props;

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
                    <a className="btn-vote" onClick={(e) => {
                        e.stopPropagation();
                        if (isWeiXin()) {
                            voteFree({ tid: getUrl('tid'), uid: window.localStorage["sfzvoteuid"], tuid: item.uid });
                        } else {

                            voteCheck({ tid: '22472da731a9404abb4001723da73ab9' });
                            setTimeout(() => {
                                if (!isVote) {
                                    props.history.push('Apply');
                                }
                            }, 1000)

                        }
                    }}>
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