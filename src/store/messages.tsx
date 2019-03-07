
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class Messages {
    @observable messages = [];
    @observable messageCount = 0;

    @action.bound
    async getMessageCount() {

        // const { data } = await axios.get(`"`);
        runInAction(() => {
            // this.messageCount = data.data;
            this.messageCount = 333;
        });
    }
}

export default new Messages();