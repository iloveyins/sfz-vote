
import React, { Component } from 'react';
import './index.scss';
interface IProps {
    img: string,
    title: string,
    shareImg: string,
    content: string,
    onBugCount(): void
}
export default class Votingdialog extends Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    render() {
        const { img, title, content, shareImg, onBugCount } = this.props;
        return (
            <div className="dialog-detial">
                <div className="dialog-wrap">
                    <div className="voting-detial">
                        <div className="voting-wrap">
                            <img className="first-img" src={img} />
                            <p className="voting-title">{title}</p>
                            <p className="voting-content">{content}</p>
                            {
                                Boolean(shareImg) ?
                                    <div className="logo-img">
                                        <img src={require(shareImg)} />
                                    </div> : ""
                            }

                            <div className="detial-footer">
                                <span onClick={onBugCount}>购买投票次数</span>
                                <span>分享拉票</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}   