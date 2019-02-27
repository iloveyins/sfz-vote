import { observable, action, configure } from 'mobx';

configure({ enforceActions: "observed" });

class Status {
    @observable loading = false;

    @action.bound
    setLoading(val) {
        this.loading = val;
    }
}

export default new Status();