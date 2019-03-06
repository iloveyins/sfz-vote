
import React, { Component } from 'react';
import './index.scss';

export default class Votingdialog extends Component {
    render() {
        return (
            <div className="dialog-detial">
                <div className="dialog-wrap">
                    <div className="voting-detial">
                        <div className="voting-wrap">
                            <img className="first-img" src={require("../../static/images/success@3x.png")} />
                            <p className="voting-title">投票成功</p>
                            <p className="voting-content">感谢您对“崔艺苑”的支持，扫码下载 十方舟短视频知识APP，学习更多的 儿童课外辅导以及兴趣培养知识，您 还有机会获得价值99</p>
                            <div className="logo-img">
                                <img src={require("../../static/images/logo.png")} />
                            </div>
                            <div className="detial-footer">
                                <span>购买投票次数</span>
                                <span>分享拉票</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}   