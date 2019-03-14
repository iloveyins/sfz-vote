
import { observable, action, runInAction, configure, flow } from 'mobx';
import axios from '../axios';

configure({ enforceActions: "observed" })


class Dialog {
    @observable isDialog = false;

    @action.bound
    async updateDialog(b: boolean) {
        runInAction(() => {
            this.isDialog = b;
        });
    }
}

export default new Dialog();