
import React from 'react';
import { Radio } from 'antd-mobile';
import './index.scss';

import Personal from './components/Personal/index';
import Team from './components/Team/index';
import { inject, observer } from 'mobx-react';

interface IProps {
    postSignUp(obj: Object): void,
    loading: Boolean,
    setLoading(val: Boolean): void,
}

@inject(({ signUp, status }) => ({
    postSignUp: signUp.postSignUp,
    loading: status.loading,
    setLoading: status.setLoading
}))

@observer
class SignUp extends React.Component<IProps>{

    state = {
        date: new Date(),
        isTeam: 0,
        isError: false,

        fromData: {
            name: "",
            phone: "",
            files: [],
            type: "",
            sex: "",
            age: "",
            declaration: ""
        }
    };

    onChange = (isTeam) => {
        this.setState({ isTeam });
    };

    onValueChange = (...args) => {
        console.log(args);
    };

    onErrorClick() {

    }

    //提交报名
    onSubmmit() {
        console.log(this.state.fromData)
        this.props.postSignUp(this.state.fromData);
    }

    constructor(props: IProps) {
        super(props);
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
                    declaration: string
                }
            }) => {
                this.setState({ isError: obj.errorStatus });

                //验证通过
                if (obj.errorStatus) {
                    console.log(obj.fromData)
                    this.setState({
                        fromData: {
                            name: obj.fromData.name,
                            phone: obj.fromData.phone.replace(/^\s+|\s+$/g, ''),
                            files: obj.fromData.files,
                            sex: obj.fromData.sex,
                            age: obj.fromData.age,
                            declaration: obj.fromData.declaration
                        }
                    });
                }
            }
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
                        // disabled={!this.state.isError}
                        onClick={this.onSubmmit}>
                        立即报名
                    </button>
                </div>
            </div>
        )
    }
}

export default SignUp;