import React from 'react';
import './index.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import VoteList from './components/vote-list/index'
import { Pagination } from '../../components/index';
import { wxInit } from '../../utils/wxShare.js';
import { inject, observer } from 'mobx-react';
import { Home as HomeStore } from '../../store/home';


interface IProps extends RouteComponentProps {
    getList(obj: { pageSize: number, pageNumber: number, tid: string }): void,
    pagesCount: number,
    officLogin(obj: object): void,
    itemInfo(tid: string): void,
    itemData: {
        activityNotice: string,
        picUrl: string
    },
    entryInfo(obj: object): void,
    setLoading(obj: boolean): void
}

interface IState {

}

@inject(({ home, status }: { home: HomeStore, status: any }) => ({
    loading: status.loading,
    setLoading: status.setLoading,
    getList: home.getList,
    officLogin: home.officLogin,
    itemInfo: home.itemInfo,
    itemData: home.itemData,
    entryInfo: home.entryInfo,
    pagesCount: home.pagesCount
}))

@observer
class Home extends React.Component<IProps, IState>{
    constructor(props: IProps, context: IState) {
        super(props, context);

        this.getList({ pageSize: 10, pageNumber: 2 });

        if (this.isWeiXin()) {
            this.weChatAuthorized();
        }

        //获取详情页信息
        this.props.itemInfo("22472da731a9404abb4001723da73ab9");
    }

    async getList(obj: { pageSize: number, pageNumber: number }) {
        await this.props.getList({
            pageSize: obj.pageSize,
            pageNumber: obj.pageNumber,
            tid: '22472da731a9404abb4001723da73ab9'
        }
        );
    }
    isWeiXin = () => {
        var ua = window.navigator.userAgent.toLowerCase();
        //通过正则表达式匹配ua中是否含有MicroMessenger字符串
        if (/MicroMessenger/i.test(ua)) {
            return true;
        } else {
            return false;
        }
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search)
        console.log(params.get('age'));
    }

    async itemInfo(tid: string) {
        await this.props.itemInfo(tid);
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
        const redirect_uri = 'https://www.nihaotime.com/voting/';
        if (code == null || code == '') {
            window.localStorage.setItem('sfzvoteappId', "")
            window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&oauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
        } else {
            var appid = window.localStorage.getItem('sfzvoteappId');
            if (appid == undefined || appid == null || appid == "") {
                //传入code
                this.props.officLogin({ code });
            }
        }
    }

    render() {
        const { itemData } = this.props;

        const data = {
            data: [],
            onWithRouter: (obj: { tid: string, uid: string }) => {
                // this.props.entryInfo({ tid: obj.tid, uid: obj.uid });

                this.props.history.push(`details/?uid=${obj.uid}&tid=${obj.tid}`);

                // this.props.history.push({
                //     pathname: 'details',

                //     state: {
                //         tid: obj.tid,
                //         uid: obj.uid,
                //     }
                // })
            },
            isVote: false
        }

        const page = {
            totalPage: this.props.pagesCount,
            paging: (obj) => {
                // this.props.setLoading(true);
                // setTimeout(() => {
                //     this.props.setLoading(false);
                // }, 3000)
                this.getList({ pageSize: obj.pageCount, pageNumber: obj.pageCurr });
            }
        }

        return (
            <div id="home">
                <div className="me-vote">
                    <img src={itemData.picUrl} />
                    <a onClick={() => {
                        this.props.history.push('signUp');
                    }}>我要报名</a>
                </div>
                <div className="list">
                    <VoteList {...data} />
                </div>
                <Pagination  {...page} />
                <div className="activity-rules">
                    <div className="activity-rules-header">
                        <img src={require("../../static/images/frame@3x.png")} alt="" />
                        <span className="text">活动规则</span>
                    </div>
                    <p>
                        {itemData.activityNotice}
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(Home); 