import React from 'react';
import './index.scss';

interface IProps {
    data: any,
}
const VoteList = (props: IProps) => {

    const { data } = props;

    return (
        data.map((item) => (
            <div className="list-item">
                <div className="item-content">
                    <div className="item-img">
                        <img alt="" src={require('../../../../static/images/banner.png')} />
                        <div className="item-title">Top{item.ranking}</div>
                    </div>
                    <div className="ticket-number">
                        <span>{item.number}号</span>
                        <span>006票</span>
                    </div>
                    <a className="btn-vote" onClick={() => {

                    }}>
                        为TA投票
                </a>
                </div>
            </div>
        ))
    )
}

export default VoteList;