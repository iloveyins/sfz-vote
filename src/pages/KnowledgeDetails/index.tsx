
import React, { Component } from 'react';
import './index.scss';

export default class KnowledgeDetails extends Component {
    render() {
        return (
            <div className="knowledge-details">
                <div className="detail-background">
                    <section className="detial-top">
                        <div className="img-wrap">
                            <img className="img-content" src={require("../../static/images/banner.png")} />
                            <img className="img-icon" src={require("../../static/images/goldmedal.png")}/>
                        </div>
                        <div className="voting-wrap">
                            <div>
                                <p>007</p>
                                <p>编号</p>
                            </div>
                            <div>
                                <p>20145</p>
                                <p>总票数</p>
                            </div>
                            <div>
                                <p>1</p>
                                <p>排名</p>
                            </div>
                            <div>
                                <p>76</p>
                                <p>距上差距</p>
                            </div>
                        </div>
                    </section>
                    <section className="detial-center">
                        <div>
                            <p>参赛宣言：{'我们三个帅哥'}</p>
                        </div>
                        <div className="declaration-detail">
                            <p>类型：团队</p>
                            <p>团队名称：国际舞蹈团</p>
                            <p>年龄范围：4~12岁</p>
                            <p>性别：男</p>
                        </div>
                    </section>
                    <p className="dashed-style"></p>
                    <section className="detial-footer">
                        <span>为TA投票</span>
                        <span>分享拉票</span>
                    </section>
                </div>
            </div>
        )
    }
}   