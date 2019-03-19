
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class Dialog {
    @observable isDialog = false;
    @observable isTobepaid = false;

    @action.bound
    async updateDialog(b: boolean) {
        runInAction(() => {
            this.isDialog = b;
        });
    }

    @action.bound
    async updateTobepaid(b: boolean) {
        runInAction(() => {
            this.isTobepaid = b;
        });
    }
}

export default new Dialog();