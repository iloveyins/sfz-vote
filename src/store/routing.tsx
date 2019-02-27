import { RouterStore } from 'mobx-react-router';
// import { browserHistory } from 'react-router';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'mobx-react-router';


const routing = new RouterStore();
const browserHistory = createBrowserHistory();
export const history = syncHistoryWithStore(browserHistory, routing);

export default routing;