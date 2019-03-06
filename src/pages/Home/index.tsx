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
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx615e5ac092e9c376&redirect_uri=https://www.10fangzhou.com&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
        // window.location.href = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx615e5ac092e9c376&secret=bc59c09b8e4e4483b33e880778a95654&code=CODE&grant_type=authorization_code";
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
                    <p>
                        1、费用包含大赛报名费、团队组织费和保险等团队活动费用<br /><br />
                        2、费用包含大赛报名费、团队组织费和保险等团队活动费用<br /><br />
                        3、费用包含大赛报名费、团队组织费和保险等团队活动费用<br />
                    </p>
                </div>
            </div>
        )
    }
}

export default Home; 