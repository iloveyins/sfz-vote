import React from 'react';
import './index.scss';

interface IProps {

}
interface IData {
    number: 0,
    vote: 0,
    ranking: 1,
    img: '../../../../static/images/banner.png'
}

const VoteList = (props: IProps) => {
    return (
        <div className="list-item">
            <div className="item-content">
                <div className="item-img">
                    <img alt="" src={require('../../../../static/images/banner.png')} />
                    <div className="item-title">Top</div>
                </div>
                <div className="ticket-number">
                    <span>001号</span>
                    <span>006票</span>
                </div>
                <a className="btn-vote" onClick={() => {

                }}>
                    为TA投票
                </a>
            </div>
        </div>
    )
}

export default VoteList;