import React from 'react';
import './index.scss';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import VoteList from './components/vote-list/index'
import { Pagination } from '../../components/index';
import { wxInit } from '../../utils/wxShare.js';
import { inject, observer } from 'mobx-react';
import { Home as HomeStore } from '../../store/home';
import { Loading } from '../../components/index'

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
    setLoading(obj: boolean): void,
    loading: boolean
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

    }

    async getList(obj: { pageSize: number, pageNumber: number, tid: string }) {
        await this.props.getList({
            pageSize: obj.pageSize,
            pageNumber: obj.pageNumber,
            tid: obj.tid
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
        var ttid = params.get('tid') ? String(params.get('tid')) : "";
        var t = "";
        if (ttid) {
            window.localStorage.setItem("tid", ttid);
            t = String(window.localStorage.getItem("tid"));
        } else {
            t = String(window.localStorage.getItem("tid"));
        }
        this.getList({
            pageSize: 10, pageNumber: 2, tid: t
        });

        if (this.isWeiXin()) {
            this.weChatAuthorized();
        }

        //获取详情页信息
        this.props.itemInfo(t);
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
        var appid = window.localStorage.getItem('sfzvoteappId');
        var uid = window.localStorage.getItem('sfzvoteuid');
        if (code == null || code == '') {
            if (appid == undefined || appid == null || appid == ""
                && uid == undefined || uid == null || uid == "") {
                window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirect_uri}&oauth_response.php&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;
                this.props.officLogin({ code });
            }
        }
    }

    render() {
        const { itemData, location: { search }, loading } = this.props;

        const data = {
            data: [],
            onWithRouter: (obj: { tid: string, uid: string }) => {
                //跳转详情页
                this.props.history.push(`details/?uid=${obj.uid}&tid=${obj.tid}`);
            },
            isVote: false
        }

        const page = {
            totalPage: this.props.pagesCount,
            paging: (obj) => {
                // this.props.setLoading(true);
                // setTimeout(() => {
                //     this.props.setLoading(false);
                // }, 2000);
                this.getList({ pageSize: obj.pageCount, pageNumber: obj.pageCurr, tid: String(window.localStorage.getItem("tid")) });
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
                    <p dangerouslySetInnerHTML={{ __html: itemData.activityNotice }}>
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(Home); 