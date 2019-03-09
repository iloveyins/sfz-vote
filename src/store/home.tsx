
import { observable, action, runInAction, configure } from 'mobx';
import http from '../axios';
import { number } from 'prop-types';
const Qs = require('qs');
configure({ enforceActions: "observed" })


export class Home {
    @observable listData = [];
    @observable itemData = [];
    @observable itemDetails = {};

    @observable pagesCount = 0;

    @action.bound  //获取列表
    async getList(obj: { pageSize: number, pageNumber: number, tid: string }) {
        const { data: { enteredPage: { list, pages } } } = await http.post(
            "commonh/enteryList",
            {
                page: {
                    pageSize: obj.pageSize,
                    pageNumber: obj.pageNumber
                },
                tid: obj.tid
            }
        )
        runInAction(() => {
            console.log(pages)
            this.pagesCount = pages;
            this.listData = list;
        });
    }


    @action.bound  //code
    async officLogin(obj: { code: string }) {
        const { data } = await http.post(
            "commonh/officLogin",
            {
                code: obj.code
            }
        )
        runInAction(() => {
            console.log(data);
            if (!window.localStorage) {
                return false;
            } else {
                //主逻辑业务
                var storage = window.localStorage;
                alert(data.uid)
                storage.setItem("sfzvoteuid", data.uid);
            }
        });
    }

    @action.bound  //活动详情页
    async itemInfo(tid: string) {
        const { data } = await http.post(
            "commonh/itemInfo",
            {
                tid: tid
            }
        )
        runInAction(() => {
            console.log(data);
            this.itemData = data.itemInfo;
        });
    }

    @action.bound  //活动详情页数据保存
    async itemDetail(obj: object) {
        runInAction(() => {
            this.itemDetails = obj;
            console.log(obj)
        });
    }

    @action.bound
    async entryInfo(obj: { tid: string, uid: string }) {
        const { data } = await http.post(`commonh/entryInfo `, {
            tid: "22472da731a9404abb4001723da73ab9",
            uid: "a9db1cb2a7c44073b75d0f5b58aa6a82"
        });

        runInAction(() => {
            this.itemDetails = data.entryInfo;
            console.log(data);
        });
    }
}

export default new Home();