import React, { Component } from "react";
import './index.scss';

interface IProps {
    totalPage: number,          //总数量
    paging(obj: Object): void,  //回调方法
    locale?: {                  //可选参数 默认不显示上一页与下一页
        prevText: String,       //上一页
        nextText: String        //下一页
    }
}

interface IState {
    pageCurr: number,          //当前页
    groupCount: number,        //显示多少分页
    startPage: number,         //开始页
    playCount: number,
    pageCount: number          //每页显示多少行数据
}

export default class Pagination extends Component<IProps, IState> {

    constructor(props: IProps, context: IState) {
        super(props, context);

        this.state = {
            pageCurr: 1,
            groupCount: 2,
            startPage: 1,
            playCount: 4,
            pageCount: 10
        }

        //默认第一次执行
        setTimeout(() => {
            props.paging({
                pageCurr: this.state.pageCurr,
                pageCount: this.state.pageCount
            })
        });

    }
    create() {
        const {
            totalPage,
            locale
        } = this.props;

        const {
            pageCurr,
            startPage,
            groupCount,
            playCount
        } = this.state;

        let pages: JSX.Element[] = [];
        if (totalPage <= playCount) {
            locale
                && locale.prevText
                && pages.push(
                    <li className={this.state.pageCurr === 1 ? "nomore" : ""}
                        onClick={this.goPrev.bind(this)}
                        key={0}> {locale.prevText}
                    </li>)

            for (let i = 1; i <= totalPage; i++) {
                // 点击页码时调用 go 方法，根据 state 判断是否应用 active 样式
                pages.push(
                    <li className={pageCurr === i ? "active" : ""}
                        onClick={this.go.bind(this, i, undefined)}
                        key={i}>{i}
                    </li>)
            }

            locale
                && locale.nextText
                && pages.push(
                    <li className={this.state.pageCurr === totalPage ? "nomore" : ""}
                        onClick={this.goNext.bind(this)}
                        key={totalPage + 1}>
                        {locale.nextText}
                    </li>)

        } else {
            locale
                && locale.prevText
                && pages.push(
                    <li className={this.state.pageCurr === 1 ? "nomore" : ""}
                        key={0}
                        onClick={this.goPrev.bind(this)}>
                        {locale.prevText}
                    </li>)

            for (let i = startPage; i < groupCount + startPage; i++) {
                if (i <= totalPage - 2) {
                    pages.push(
                        <li className={this.state.pageCurr === i ? "active" : ""}
                            onClick={this.go.bind(this, i, undefined)}
                            key={i}>{i}
                        </li>)
                }
            }

            // 分页中间的省略号
            // pages.push(<li className={"ellipsis"} key={-1}>···</li>)
            if (totalPage - startPage >= playCount - 1) {
                pages.push(<li className={"ellipsis"} key={-1}>···</li>)
            }

            // 倒数第一、第二页
            pages.push(
                <li className={this.state.pageCurr === totalPage - 1 ? "active" : ""}
                    key={totalPage - 1}
                    onClick={this.go.bind(this, totalPage - 1, undefined)}>
                    {totalPage - 1}</li>
            )

            pages.push(
                <li className={this.state.pageCurr === totalPage ? "active" : ""}
                    key={totalPage}
                    onClick={this.go.bind(this, totalPage, undefined)}>
                    {totalPage}
                </li>)

            // 下一页
            locale && locale.nextText && pages.push(
                <li className={this.state.pageCurr === totalPage ? "nomore" : ""}
                    key={totalPage + 1}
                    onClick={this.goNext.bind(this)}>
                    {locale.nextText}
                </li>)
        }
        return pages;
    }
    // 更新 state
    go(pageCurr, reset = false) {

        const { groupCount } = this.state;
        const { totalPage, paging, locale } = this.props;
        console.log(pageCurr % groupCount)
        if (pageCurr < 1) {
            return;
        }
        if (pageCurr == 1) {

            this.setState({
                pageCurr
            });

            setTimeout(() => {
                paging({
                    pageCurr: this.state.pageCurr,
                    pageCount: this.state.pageCount
                })
            });
            return;
        }
        // 处理下一页的情况
        if (pageCurr % groupCount === 1 || pageCurr % groupCount === 2) {
            this.setState({
                startPage: pageCurr - 1
            })
        }

        // 处理上一页的情况
        if (pageCurr % groupCount === 0) {
            this.setState({
                startPage: pageCurr - groupCount + 2
            })
        }

        // 点击最后两页时重新计算 startPage
        if (totalPage - pageCurr < 2) {
            this.setState({
                startPage: totalPage - groupCount,
            })
        }

        // 选择每页条数后重新分页
        if (reset === true) {
            this.setState({
                pageCurr: 1,
                startPage: 1,
            });
        }

        this.setState({
            pageCurr
        });

        setTimeout(() => {
            paging({
                pageCurr: this.state.pageCurr,
                pageCount: this.state.pageCount
            })
        });
    }
    // 页面向前
    goPrev() {
        let {
            pageCurr,
        } = this.state;

        if (--pageCurr === 0) {
            return;
        }

        this.go(pageCurr)
    }
    // 页面向后
    goNext() {
        let {
            pageCurr,
        } = this.state;

        const {
            totalPage,
        } = this.props;

        if (++pageCurr > totalPage) {
            return;
        }

        this.go(pageCurr)
    }

    render() {
        const Pages = this.create.bind(this)();
        return (
            <div className="main">
                <ul className="page">
                    {Pages}
                </ul>
            </div>
        );
    }
}
