
import React, { Component } from 'react';
import './index.scss';
import { RouteComponentProps } from 'react-router';
interface IProps extends RouteComponentProps {
    img: string,
    title: string,
    shareImg: string,
    content: string,
}
export default class VotingDialog extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    onBugCount = () => {
        this.props.history.push('Apply');
    }
    render() {
        const { location: { state: { title, content, shareImg, success } } } = this.props;
        return (
            <div className="dialog-detial">
                <div className="dialog-wrap">
                    <div className="voting-detial">
                        <div className="voting-wrap">
                            {success ? <img className="first-img" src={require('../../static/images/success@3x.png')} />
                                : <img className="first-img" src={require('../../static/images/failure@3x.png')} />}

                            <p className="voting-title">{title}</p>
                            <p className="voting-content">{content}</p>
                            {
                                Boolean(shareImg) ?
                                    <div className="logo-img">
                                        <img src={require('../../static/images/code.png')} />
                                    </div> : ""
                            }
                            <div className="detial-footer">
                                <span onClick={this.onBugCount}>购买投票次数</span>
                                <span onClick={
                                    () => {
                                        this.props.history.push('/');
                                    }}>返回</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
