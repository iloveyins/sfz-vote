
import React from 'react';
import { Radio, Picker, InputItem, List, DatePicker, ImagePicker } from 'antd-mobile';
const RadioItem = Radio.RadioItem;
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
        value: 0,
        files: data,
        multiple: false,
        sex: 0,
        phone: '13617326163'
    };

    onChange = (sex) => {
        this.setState({ sex });
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
        const data1 = [
            { value: 0, label: '男' },
            { value: 1, label: '女' },
        ];

        return (
            <div id="personal">
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
                        type="phone"
                        placeholder="必填"
                        error={this.state.hasError}
                        onErrorClick={this.onErrorClick}
                        onChange={this.onChange}
                        value={this.state.phone}
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
            </div>
        )
    }
}