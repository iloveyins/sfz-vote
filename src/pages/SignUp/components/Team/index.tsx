
import React from 'react';
import { Radio, Picker, InputItem, List, DatePicker, ImagePicker } from 'antd-mobile';
import './index.scss';

interface IProps {

}
const data = [{
    url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
    id: '2121',
}];
export default class Personal extends React.Component<IProps> {
    state = {
        date: new Date(),
        hasError: false,
        value: '',
        files: data,
        multiple: false,
        team: 0,

        phone: '',
        code: '',
        name: '',
        codeText: '获取验证码',
        ageBracket: [],

        phoneHasError: false,
        codeHasError: false,
        nameHasError: false,
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

    //验证验证码
    onErrorCode() {
        let count = 5;
        if (this.onError(this.state.phone, 2) && this.onError(this.state.code, 1)) {
            this.setState({ codeText: `${count}s` });
            var clrarTime = setInterval(() => {
                count--;
                if (count == 0) {
                    this.setState({ codeText: `重新发送` });
                    clearInterval(clrarTime);
                    return;
                }
                this.setState({ codeText: `${count}s` });
            }, 1000);
        }
    }

    onError(value, type) {
        var ret = false;
        switch (type) {
            case 1:  //验证码验证
                if (value.length <= 0) {
                    this.setState({ codeHasError: true });
                    ret = false;
                } else {
                    this.setState({ codeHasError: false });
                    ret = true;
                }
                this.setState({ code: value });
                break;
            case 2:  //手机号码验证
                if (value.replace(/\s/g, '').length < 11) {
                    this.setState({ phoneHasError: true });
                    ret = false;
                } else {
                    this.setState({ phoneHasError: false });
                    ret = true;
                }
                this.setState({ phone: value });
                break;
            case 3:  //团队名称
                if (value.length < 1) {
                    this.setState({ nameHasError: true });
                    ret = false;
                } else {
                    this.setState({ nameHasError: false });
                    ret = true;
                }
                this.setState({ name: value });
                break;
        }
        return ret;
    }

    constructor(props: IProps) {
        super(props);
    }

    render() {
        const seasons = [

            {
                label: '0岁-2岁',
                value: '1',
            },
            {
                label: '3岁-6岁',
                value: '2',
            },
            {
                label: '8岁-12岁',
                value: '3',
            },
            {
                label: '12岁-32岁',
                value: '4',
            },
            {
                label: '32岁-38岁',
                value: '5',
            },
            {
                label: '50岁-60岁',
                value: '6',
            },
            {
                label: '70岁-80岁',
                value: '7',
            },
        ];
        return (
            <div id="personal">
                <div className="content-item">
                    <InputItem
                        value={this.state.name}
                        placeholder="必填"
                        error={this.state.nameHasError}
                        onChange={(value) => { this.onError(value, 3); }}
                    >*团队名称：</InputItem>
                </div>
                <div className="content-item">
                    <Picker data={seasons} cols={1} className="forss"
                        value={this.state.ageBracket}
                        onChange={ageBracket => this.setState({ ageBracket })}
                    >
                        <List.Item arrow="horizontal">* 年龄范围：</List.Item>
                    </Picker>
                </div>
                <div className="content-item">
                    <InputItem
                        clear
                        placeholder="非必填"
                    >参赛宣言：</InputItem>
                </div>
                <div className="content-item">
                    <InputItem
                        value={this.state.phone}
                        type="phone"
                        placeholder="必填"
                        error={this.state.phoneHasError}
                        onErrorClick={this.onErrorClick}
                        onChange={(value) => { this.onError(value, 2); }}
                    >* 领队电话：</InputItem>
                </div>
                <div className="content-item code">
                    <InputItem
                        error={this.state.codeHasError}
                        type="number"
                        placeholder="必填"
                        maxLength={6}
                        value={this.state.code}
                        onChange={(value) => { this.onError(value, 1) }}
                    >* 验证码：</InputItem>
                    <a className="code-text"
                        onClick={() => { this.onErrorCode(); }} >{this.state.codeText}</a>
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
            </div>
        )
    }
}