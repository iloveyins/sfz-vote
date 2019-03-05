import React from 'react';
import './index.scss';

import VoteList from './components/vote-list/index'

import { Pagination } from '../../components/index';

interface Iprops {

}
interface IState {

}

class Home extends React.Component<Iprops>{
    constructor(props: Iprops) {
        super(props);
    }
    render() {
        const data = {
            data: [
                {
                    number: 12,
                    vote: 0,
                    ranking: 1,
                    img: '../../../../static/images/banner.png'
                },
                {
                    number: 23,
                    vote: 0,
                    ranking: 1,
                    img: '../../../../static/images/banner.png'
                },
                {
                    number: 23,
                    vote: 0,
                    ranking: 1,
                    img: '../../../../static/images/banner.png'
                },
                {
                    number: 23,
                    vote: 0,
                    ranking: 1,
                    img: '../../../../static/images/banner.png'
                },
                {
                    number: 23,
                    vote: 0,
                    ranking: 1,
                    img: '../../../../static/images/banner.png'
                }
            ]
        }
        const pages = {
            totalPage: 4,
            paging: (obj) => {
                // this.props.setLoading(true);
                // setTimeout(() => {
                //     this.props.setLoading(false);
                // }, 3000)
                console.log(obj)
            }
        }
        return (
            <div id="home">
                <div className="me-vote">
                    <img src={require("../../static/images/banner.png")} />
                    <a href="#">我要报名</a>
                </div>
                <div className="list">
                    <VoteList {...data} />
                </div>
                <Pagination  {...pages} />
                <div className="activity-rules">
                    <div className="activity-rules-header">
                        <img src={require("../../static/images/frame@3x.png")} alt="" />
                        <span className="text">活动规则</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home; 