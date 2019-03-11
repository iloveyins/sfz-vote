
import React from 'react';
import { Radio } from 'antd-mobile';
import './index.scss';

import Personal from './components/Personal/index';
import Team from './components/Team/index';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

interface IProps extends RouteComponentProps {
    postSignUp(obj: FormData): void,
    weChatPay(obj: object): object,
    loading: Boolean,
    setLoading(val: Boolean): void,
    WCPayPramas: {}
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
        declaration: string
    },
    tuid: string
}

@inject(({ signUp, status, pay }) => ({
    postSignUp: signUp.postSignUp,
    loading: status.loading,
    setLoading: status.setLoading,
    weChatPay: pay.weChatPay,
    WCPayPramas: pay.WCPayPramas
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
        let data = {
            uid: "",
            tid: "",
            entryType: 1,
            name: this.state.fromData.name,
            link_phone: this.state.fromData.phone,
            sex: this.state.fromData.sex,
            birthday: this.state.fromData.age,
            declaration: this.state.fromData.declaration,
            ageRegion: "",
        }
        form.append("coverFile", this.state.fromData.files[0].file);

        form.append('data', JSON.stringify({
            entryInfo: {
                uid: "9c651381cb154e4196125fb0548e82e6",
                tid: "22472da731a9404abb4001723da73ab9",
                entryType: 1,
                name: 'dashu',
                link_phone: 15580972180,
                sex: '2',
                birthday: '1995-07-07',
                declaration: '测试',
                ageRegion: "",
                captcha: "111111"
            }
        }))
        // form.append("uid", "");
        // form.append("tid", "");
        // form.append("entryType", "1");
        // form.append("name", "1");
        // form.append("link_phone", "1");
        // form.append("sex", "1");
        // form.append("birthday", "");
        // form.append("declaration", "234");
        // form.append("ageRegion", "");

        this.postSign(form);
    }

    async postSign(form) {
        const r = await this.props.postSignUp(form);
        console.log(r);

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

    onBridgeReady() {
        this.props.weChatPay && this.props.weChatPay({
            tid: "22472da731a9404abb4001723da73ab9",
            uid: window.localStorage.getItem('sfzvoteuid'),
            tuid: "",
            openId: window.localStorage.getItem('sfzvoteappId'),
            orderType: "2",
            voteNum: "10"
        });
    }

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            date: new Date(),
            isTeam: 0,
            isError: false,

            fromData: {
                name: "",
                phone: "",
                files: [],
                sex: 0,
                age: 0,
                declaration: "",
                captcha: ""
            },
            tuid: ""
        };


    }

    render() {
        const teamData = [
            { value: 0, label: '个人' },
            { value: 1, label: '团队' },
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
                    captcha: string
                }
            }) => {

                this.setState({ isError: obj.errorStatus });

                //验证通过
                if (obj.errorStatus) {
                    console.log(obj.fromData)
                    this.setState({
                        fromData: {
                            name: obj.fromData.name,
                            phone: obj.fromData.phone.replace(/\s+/g, ""),
                            files: obj.fromData.files,
                            sex: obj.fromData.sex,
                            age: obj.fromData.age,
                            declaration: obj.fromData.declaration,
                            captcha: obj.fromData.captcha
                        }
                    });
                }
            },
            sendCaptcha: () => { }
        }


        return (
            <div className="sign-up">
                <img className="sign-up-img" src={require("../../static/images/banner.png")} />
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
                        this.state.isTeam ? <Team  {...status} /> : <Personal {...status} />
                    }
                    <div className="activity-price">
                        活动费用：600元
                    </div>
                    <div className="explanation">
                        <div className="explanation-text">费用说明</div>
                        <p>
                            1、费用包含大赛报名费、团队组织费和保险等团队活动费用<br /><br />
                            2、费用包含大赛报名费、团队组织费和保险等团队活动费用<br /><br />
                            3、费用包含大赛报名费、团队组织费和保险等团队活动费用<br />
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