
import { observable, action, runInAction, configure } from 'mobx';
import http from '../axios';
const Qs = require('qs');
configure({ enforceActions: "observed" })


class Home {
    @observable listData = [];
    @observable itemData = []

    @action.bound  //获取列表
    async getList(obj: { pageSize: number, pageNumber: number, tid: string }) {
        const { data: { enteredPage: { list } } } = await http.post(
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
            this.listData = data;
        });
    }

    @action.bound  //活动详情页
    async itemInfo(tid: string ) {
        const { data } = await http.post(
            "commonh/itemInfo",
            {
                tid: tid
            }
        )
        runInAction(() => {
            console.log(data);
            this.itemData = data;
        });
    }


}

export default new Home();