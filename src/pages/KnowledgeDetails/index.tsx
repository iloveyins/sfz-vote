
import React, { Component } from 'react';
import './index.scss';
import Paydialog from '../Apply/index'
export interface IProps {
    detial: object;
    show: boolean;
}
export interface IState {
    isAlert: boolean
}
export default class KnowledgeDetails extends Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props, context);
        this.state = {
            isAlert: false
        }
    }

    render() {
        const data = {
            image: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551877236609&di=5609ca52c70751baf8a9778e53f50bfb&imgtype=0&src=http%3A%2F%2Fc.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fa5c27d1ed21b0ef4b9e8896ad3c451da81cb3e85.jpg",
            medal: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551877066544&di=8e42202226c765ecbb06185807609882&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2F11385343fbf2b2114a65cd70c48065380cd78e41.jpg",
            number: '007',
            votes: '5156',
            ranking: '5156',
            disparity: '5156',
            detial: {
                declaration: '5156',
                type: '5156',
                teamName: "",
                name: '5156',
                age: '5156',
                sex: '5156',
            }
        }
        let self = this;
        const dataDetail = {
            img: '',
            title: '',
            shareImg: '',
            content: '',
            onBugCount() {
                self.setState({ isAlert: false })
            }
        }
        return (
            <div className="knowledge-details">
                <div className="detail-background">
                    <section className="detial-top">
                        <div className="img-wrap">
                            <img className="img-content" src={data.image} />
                            <img className="img-icon" src={data.medal} />
                        </div>
                        <div className="voting-wrap">
                            <div>
                                <p>{data.number}</p>
                                <p>编号</p>
                            </div>
                            <div>
                                <p>{data.votes}</p>
                                <p>总票数</p>
                            </div>
                            <div>
                                <p>{data.votes}</p>
                                <p>排名</p>
                            </div>
                            <div>
                                <p>{data.ranking}</p>
                                <p>距上差距</p>
                            </div>
                        </div>
                    </section>
                    <section className="detial-center">
                        <div>
                            <p>参赛宣言：{data.detial.declaration}</p>
                        </div>
                        {
                            Boolean(data.detial.type === '个人') ?
                                <div className="declaration-detail">
                                    <p>类型：{data.detial.type}</p>
                                    <p>姓名：{data.detial.name}</p><p>性别：{data.detial.sex}</p><p>年龄范围：{data.detial.age}</p>
                                </div>
                                :
                                <div className="declaration-detail">
                                    <p>类型：{data.detial.type}</p>
                                    <p>团队名称：{data.detial.teamName}</p><p>年龄范围：{data.detial.age}</p>
                                </div>
                        }
                    </section>
                    <p className="dashed-style"></p>
                    <section className="detial-footer">
                        <span onClick={() => {
                        }}>为TA投票</span>
                        <span>分享拉票</span>
                    </section>
                </div>
            </div>
        )
    }
}   