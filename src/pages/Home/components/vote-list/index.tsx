import React from 'react';
import { withRouter } from "react-router-dom";
import './index.scss';
import VoteDetails from '../../../voteDetails/index';

import { observer, inject } from 'mobx-react'

interface IProps {
    data: any,
    onWithRouter(obj: object): void
}

const VoteList = (props: IProps) => {

    const { data, onWithRouter } = props;

    const from = {
        detial: {},
        show: true
    }

    return (
        data.map((item) => (
            <div className="list-item" key={item.id} onClick={(e) => {

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
                    }}>
                        为TA投票
                </a>
                </div>
            </div>
        ))
    )
}
 
export default inject(({ home, status }) => ({
    data: home.listData,
}))(observer(VoteList));