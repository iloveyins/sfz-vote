import React from 'react';
import './index.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import VoteList from './components/vote-list/index'
import { Pagination } from '../../components/index';
import { wxInit } from '../../utils/wxShare.js';
import { inject, observer } from 'mobx-react';

interface IProps extends RouteComponentProps {
    getList(obj: { pageSize: number, pageNumber: number, tid: string }): void,
    listData: [],
    officLogin(obj: object): void
}

interface IState {

}

@inject(({ home, status }) => ({
    loading: status.loading,
    setLoading: status.setLoading,
    getList: home.getList,
    officLogin: home.officLogin,
    listData: home.listData,
}))

@observer
class Home extends React.Component<IProps, IState>{
    constructor(props: IProps, context: IState) {
        super(props, context);

        this.state = {
            listData: [],
            onWithRouter: (obj: object) => {
                this.props.history.push('details');
            },
        }

        this.getList();

        this.weChatAuthorized();
    }

    async getList() {
        console.log(this.props.listData)
        await this.props.getList({ pageSize: 10, pageNumber: 1, tid: '22472da731a9404abb4001723da73ab9' });
    }

    getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    //微信授权
    weChatAuthorized() {
        const appId = 'wx615e5ac092e9c376';
        const code = this.getQueryString('code');
        const redirect_uri = 'https://www.nihaotime.com/voting/#/';
        if (code == null || code == '') {
            //window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx615e5ac092e9c376&redirect_uri=https://www.nihaotime.com/voting&oauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
        } else {
            //传入code
            this.props.officLogin({ code })
        }
    }

    render() {
        const data = {
            data: [],
            onWithRouter: (obj: object) => {
                console.log(obj)
                this.props.history.push('details');
            }
        }

        const pages = {
            totalPage: 4,
            paging: (obj) => {
                // this.props.setLoading(true);
                // setTimeout(() => {
                //     this.props.setLoading(false);
                // }, 3000)
                console.log(obj);
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

export default withRouter(Home); 