
import { observable, action, runInAction, configure } from 'mobx';
import axios from '../axios';
const Qs = require('qs');
configure({ enforceActions: "observed" })


class Home {
    @observable listData = []

    @action.bound  //获取列表
    async getList(obj: { pageSize: number, pageNumber: number, tid: string }) {
        const { data } = await axios.post(
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
            this.listData = data;
        });
    }


    @action.bound  //code
    async officLogin(obj: { code: string }) {
        const { data } = await axios.post(
            "commonh/officLogin",
            {
                code: obj.code
            }
        )
        runInAction(() => {
            this.listData = data;
        });
    }


}

export default new Home();