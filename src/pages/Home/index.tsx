import React from 'react';
import './index.scss';
import VoteList from './components/vote-list/index';

interface Iprops {

}
interface IState {

}

class Home extends React.Component<Iprops>{
    constructor(props: Iprops) {
        super(props);
    }
    render() {
        const voteData = [{
            number: 0,
            vote: 0,
            ranking: 1,
            img: '../../../../static/images/banner.png'
        }]

        return (
            <div id="home">
                <div className="me-vote">
                    <img src={require("../../static/images/banner.png")} />
                    <a href="#">我要报名</a>
                </div>
                <div className="list">
                    <VoteList />
                </div>
            </div>
        )
    }
}

export default Home; 