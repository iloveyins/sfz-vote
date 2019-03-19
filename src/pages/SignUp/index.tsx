
import React from 'react';
import { Radio } from 'antd-mobile';
import './index.scss';

import Personal from './components/Personal/index';
import Team from './components/Team/index';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

import { Dialog, Tobepaid } from '../../components/index'

interface IProps extends RouteComponentProps {
    postSignUp(obj: FormData): void,
    weChatPay(obj: object): string,
    loading: Boolean,
    setLoading(val: Boolean): void,
    WCPayPramas: {},
    itemData: { activityRule: string, entryCharge: number },
    updateDialog?(b: boolean): void,
    isDialog?: boolean,
    isTobepaid?: boolean,
    updateTobepaid?(b: boolean): void,
}

interface IState {
    date: any,
    isTeam: number,
    isError: boolean,

    fromData: {
        name: string,
        phone: string,
        sex: number,
        files: any,
        age: any,
        captcha: string
        declaration: string,
        ageRegion: string
    },
    tuid: string,
    dialogData: {
        img: string,
        title: string,
        shareImg: boolean,
        content: string,
        success: boolean,
        onBayCount?(): void
    },
    tobepaiddialogData: {
        img: string,
        title: string,
        content: string,
        success: boolean,
        voteNum: number,
        shareImg: boolean
    }
}

@inject(({ home, signUp, status, pay, dialog }) => ({
    postSignUp: signUp.postSignUp,
    loading: status.loading,
    setLoading: status.setLoading,
    weChatPay: pay.weChatPay,
    WCPayPramas: pay.WCPayPramas,
    itemData: home.itemData,
    updateDialog: dialog.updateDialog,
    isDialog: dialog.isDialog,
    isTobepaid: dialog.isTobepaid,
    updateTobepaid: dialog.updateTobepaid
}))

@observer
class SignUp extends React.Component<IProps, IState>{

    onChange = (isTeam) => {
        this.setState({ isTeam });
    };

    onValueChange = (...args) => {
        console.log(args);
    };

    onErrorClick() {

    }

    //提交报名
    onSubmmit = () => {
        // FormData 对象
        var form = new FormData();
        form.append("coverFile", this.state.fromData.files[0].file);
        form.append('data', JSON.stringify({
            entryInfo: {
                uid: window.localStorage.getItem('sfzvoteuid'),
                tid: window.localStorage.getItem("tid"),
                entryType: this.state.isTeam,
                name: this.state.fromData.name,
                link_phone: this.state.fromData.phone,
                sex: this.state.fromData.sex,
                birthday: this.state.fromData.age,
                declaration: this.state.fromData.declaration,
                ageRegion: this.state.fromData.ageRegion,
                captcha: this.state.fromData.captcha
            }
        }))
        this.postSign(form);
    }

    async postSign(form) {
        const r = await this.props.postSignUp(form);
        alert(JSON.stringify(r));
        if (r['msg'] != "成功") {
            this.setState({
                tobepaiddialogData: {
                    img: "",
                    title: "未支付，请及时支付",
                    shareImg: false,
                    content: "支付成功之后，则报名成功！",
                    success: false,
                    voteNum: this.props.itemData.entryCharge
                }
            })
            this.props.updateTobepaid && this.props.updateTobepaid(true);
        } else {
            this.onWeixinJSBridge();
        }
    }

    onWeixinJSBridge() {
        //@ts-ignore
        if (typeof window.WeixinJSBridge == "undefined") {
            if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
                //@ts-ignore
            } else if (document.attachEvent) {
                //@ts-ignore
                document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
                //@ts-ignore
                document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
        } else {
            this.onBridgeReady();
        }
    }

    onBridgeReady = async () => {
        const r = this.props.weChatPay && await this.props.weChatPay({
            tid: window.localStorage.getItem("tid"),
            uid: window.localStorage.getItem('sfzvoteuid'),
            tuid: "",
            openId: window.localStorage.getItem('sfzvoteappId'),
            orderType: "1",
            voteNum: this.props.itemData.entryCharge
        });
        if (r == '0') {
            this.setState({
                dialogData: {
                    img: "",
                    title: "恭喜您！报名成功",
                    shareImg: false,
                    content: "1-2个工作日审核通过后，会在投票页显示，并发送短信提示哦~",
                    success: true
                }
            })
            this.props.updateDialog && this.props.updateDialog(true);
        }
        else {
            this.setState({
                dialogData: {
                    img: "",
                    title: "报名失败",
                    shareImg: false,
                    content: "请支付订单",
                    success: false
                }
            })
            this.props.updateDialog && this.props.updateDialog(true);
        }
    }

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            date: new Date(),
            isTeam: 1,
            isError: false,
            fromData: {
                name: "",
                phone: "",
                files: [],
                sex: 0,
                age: 0,
                declaration: "",
                captcha: "",
                ageRegion: ""
            },
            tuid: "",

            dialogData: {
                img: "",
                title: "",
                shareImg: false,
                content: "",
                success: false,
                onBayCount: () => {

                }
            },
            tobepaiddialogData: {
                img: "",
                title: "",
                content: "",
                success: false,
                voteNum: 0,
                shareImg: false
            }
        };
    }

    render() {
        const teamData = [
            { value: 1, label: '个人' },
            { value: 2, label: '团队' },
        ];

        const status = {
            onStatusError: (obj: {
                errorStatus: boolean,
                fromData: {
                    name: string,
                    phone: string,
                    sex: number,
                    files: any,
                    age: any,
                    declaration: string,
                    captcha: string,
                    ageRegion: string
                }
            }) => {
                this.setState({ isError: obj.errorStatus });
                //验证通过
                if (obj.errorStatus) {
                    this.setState({
                        fromData: {
                            name: obj.fromData.name,
                            phone: obj.fromData.phone.replace(/\s+/g, ""),
                            files: obj.fromData.files,
                            sex: obj.fromData.sex,
                            age: obj.fromData.age,
                            declaration: obj.fromData.declaration,
                            captcha: obj.fromData.captcha,
                            ageRegion: obj.fromData.ageRegion
                        }
                    });
                }
            },
            sendCaptcha: () => { }
        }

        return (
            <div className="sign-up">
                {this.props.isDialog ? <Dialog {...this.state.dialogData} /> : ""}
                {this.props.isTobepaid ? <Tobepaid {...this.state.tobepaiddialogData} /> : ""}
                <img className="sign-up-img" src={require("../../static/images/banner.jpg")} />
                <div className="sign-up-content">
                    <div className="types-entries">
                        <div className="text types-item">参赛类型：</div>
                        {teamData.map(i => (
                            <Radio className="my-radio types-item"
                                key={i.value}
                                checked={this.state.isTeam === i.value}
                                onChange={() => this.onChange(i.value)}>
                                {i.label}
                            </Radio>
                        ))}
                    </div>
                    {
                        this.state.isTeam === 2 ? <Team  {...status} /> : <Personal {...status} />
                    }
                    <div className="activity-price">
                        活动费用：{this.props.itemData.entryCharge}元
                    </div>
                    <div className="explanation">
                        <div className="explanation-text">费用说明</div>
                        <p>
                            {this.props.itemData.activityRule}
                        </p>
                    </div>
                    <button
                        className={`sign-btn ${this.state.isError ? 'sign-btn-ok' : ''}`}
                        disabled={!this.state.isError}
                        onClick={this.onSubmmit}>
                        立即报名
                    </button>
                </div>
            </div>
        )
    }
}

export default SignUp;