
import { observable, action, runInAction, configure } from 'mobx';
import axios from '../axios';
const Qs = require('qs');
configure({ enforceActions: "observed" })


class Home {
    @observable messages = [];
    @observable messageCount = 0;

    @action.bound

    async getList(obj: { pageSize: number, pageNumber: number }) {

        var fd = new FormData()

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const s = axios({
            url: "common/videoSharePlay",
            method: 'post',
            data: Qs.stringify({
                data: { vid: "asdf" }
            }),

        })

        // const { data } = await axios.post(`common/videoSharePlay`,

        //     config
        // );

        runInAction(() => {
            // this.messageCount = data.data;
            // console.log(data)
            this.messageCount = 333;
        });
    }
}

export default new Home();