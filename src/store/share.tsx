
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';
import { string } from 'prop-types';

configure({ enforceActions: "observed" })


class shaer {

    @action.bound
    //微信分享
    async getShareParam(url: string) {
        const { data } = await axios.post(`/commonh/getShareParam`, {
            shareUrl: url
        });
        runInAction(() => {
            console.log(data)
        });
    }
}

export default new shaer();