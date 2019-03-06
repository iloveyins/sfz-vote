
import React from 'react';
import { Radio, Picker, InputItem, List, DatePicker, ImagePicker } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
import './index.scss';
import { values } from 'mobx';

interface IProps {
}

interface IState {
    date: any,
    hasError: boolean,
    value: number,
    files: any,
    multiple: boolean,
    sex: number,
    codeText: string,

    code: string,
    phone: string,
    name: string,

    phoneHasError: boolean,
    codeHasError: boolean,
    nameHasError: boolean,
}

export default class Personal extends React.Component<IProps, IState> {
    constructor(props: IProps, context: IState) {
        super(props, context);

        this.state = {
            date: new Date(),
            hasError: false,
            value: 0,
            files: [{
                url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
                id: '2121',
            }],
            multiple: false,
            sex: 0,
            codeText: '获取验证码',

            code: '',
            phone: '',
            name: '',

            phoneHasError: false,
            codeHasError: false,
            nameHasError: false,

        };

    }

    componentDidMount() {
    }

    onChange = (sex) => {
        this.setState({ sex });
    };

    onFilesChange = (files, type, index) => {
        console.log(files)
        this.setState({
            files,
        });
    }

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
            case 3:  //姓名
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

    render() {
        const data1 = [
            { value: 0, label: '男' },
            { value: 1, label: '女' },
        ];

        return (
            <div id="personal">
                <div className="content-item">
                    <InputItem
                        value={this.state.name}
                        placeholder="必填"
                        error={this.state.nameHasError}
                        onChange={(value) => { this.onError(value, 3); }}
                    >*姓 名：</InputItem>
                </div>

                <div className="types-entries content-item">
                    <div className="text types-item">* 性  别：</div>
                    {data1.map(i => (
                        <Radio className="my-radio types-item" key={i.value} checked={this.state.sex === i.value} onChange={() => this.onChange(i.value)}>
                            {i.label}
                        </Radio>
                    ))}
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
                        value={this.state.phone}
                        type="phone"
                        placeholder="必填"
                        error={this.state.phoneHasError}
                        onErrorClick={this.onErrorClick}
                        onChange={(value) => { this.onError(value, 2); }}
                    >* 电 话：</InputItem>
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
                            onChange={this.onFilesChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={this.state.files.length < 1}
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