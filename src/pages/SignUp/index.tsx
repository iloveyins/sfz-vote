
import React from 'react';
import { Radio } from 'antd-mobile';
import './index.scss';

import Personal from './components/Personal/index';
import Team from './components/Team/index'



interface IProps {

}
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}];

class SignUp extends React.Component<IProps>{
    state = {
        date: new Date(),
        hasError: false,
        value: '',
        files: data,
        multiple: false,
        isTeam: 0
    };
    onChange = (isTeam) => {
        this.setState({ isTeam });
    };
    onValueChange = (...args) => {
        console.log(args);
    };
    onErrorClick() {

    }
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const teamData = [
            { value: 0, label: '个人' },
            { value: 1, label: '团队' },
        ];
        return (
            <div className="sign-up">
                <img className="sign-up-img" src={require("../../static/images/banner.png")} />
                <div className="sign-up-content">
                    <div className="types-entries">
                        <div className="text types-item">参赛类型：</div>
                        {teamData.map(i => (
                            <Radio className="my-radio types-item" key={i.value} checked={this.state.isTeam === i.value} onChange={() => this.onChange(i.value)}>
                                {i.label}
                            </Radio>
                        ))}
                    </div>
                    {
                        this.state.isTeam ? <Team /> : <Personal />
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
                    <div className="sign-btn">
                        立即报名
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;