import React from 'react';
import './index.scss';

import VoteList from './components/vote-list/index'

interface Iprops {

}
interface IState {

}

class Home extends React.Component<Iprops>{
    constructor(props: Iprops) {
        super(props);
    }
    render() {
        return (
            <div id="home">
                <div className="me-vote">
                    <img src={require("../../static/images/banner.png")} />
                    <a href="#">我要报名</a>
                </div>
                <div className="list">

                    <div className="list-item">
                        <div className="item-content">
                            <div className="item-img">
                                <img alt="" src={require('../../static/images/banner.png')} />
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

                </div>
            </div>
        )
    }
}

export default Home; 