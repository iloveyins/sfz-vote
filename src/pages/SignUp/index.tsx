
import React from 'react';
import { Radio, Picker, InputItem, List, DatePicker, ImagePicker } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import './index.scss';
import { string } from 'prop-types';

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
    };
    onChange = (value) => {
        console.log(value);
        this.setState({ value });
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
        return (
            <div className="sign-up">
                <img className="sign-up-img" src={require("../../static/images/banner.png")} />
                <div className="sign-up-content">

                    <div className="types-entries">
                        <div className="text types-item">参赛类型：</div>
                        <Radio className="my-radio types-item" onChange={e => console.log('checkbox', e)}>个人</Radio>
                        <Radio className="my-radio types-item" onChange={e => console.log('checkbox', e)}>团队</Radio>
                    </div>
                    <div className="types-entries content-item">
                        <div className="text types-item">* 性  别：</div>
                        <Radio className="my-radio types-item" onChange={e => console.log('checkbox', e)}>男</Radio>
                        <Radio className="my-radio types-item" onChange={e => console.log('checkbox', e)}>女</Radio>
                    </div>

                    <div className="content-item">
                        <DatePicker
                            mode="date"
                            title="选择出生年月日"
                            extra="Optional"
                            value={this.state.date}
                            onChange={date => this.setState({ date })}
                        >
                            <List.Item arrow="horizontal">* 年 龄：</List.Item>
                        </DatePicker>
                    </div>
                    <div className="content-item">
                        <InputItem
                            clear
                            placeholder="非必填"
                        >宣 言：</InputItem>
                    </div>
                    <div className="content-item">
                        <InputItem
                            type="phone"
                            placeholder="必填"
                            error={this.state.hasError}
                            onErrorClick={this.onErrorClick}
                            onChange={this.onChange}
                            value={this.state.value}
                        >* 电 话：</InputItem>
                    </div>
                    <div className="content-item code">
                        <InputItem
                            value="not editable"
                            placeholder="必填"
                            editable={false}
                        >* 验证码：</InputItem>
                        <a href="" className="code-text">获取验证码</a>
                    </div>
                    <div className="content-item">
                        <span className="cover-lable">*封面图片</span>
                        <div className="cover">
                            <ImagePicker
                                className="cover-file"
                                files={this.state.files}
                                onChange={this.onChange}
                                onImageClick={(index, fs) => console.log(index, fs)}
                                selectable={this.state.files.length < 7}
                                multiple={this.state.multiple}
                            />
                            <div className="text">
                                上传封面图片<br />
                                用于报名和人气投票
                            </div>
                        </div>
                    </div>
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