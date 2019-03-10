import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import './utils/flexible';
import 'antd-mobile/dist/antd-mobile.css';

import Home from './pages/Home/index';
import Apply from './pages/Apply/index';
import VoteDetails from './pages/voteDetails/index';
import ApplyJoin from './pages/ApplyJoin/index';
import SignUp from './pages/SignUp/index';
import PaySuccess from './pages/PaySuccess/index';
import VotingDialog from './components/votingdialog/index';
import * as serviceWorker from './serviceWorker';
import { HashRouter, Route } from 'react-router-dom';

import store from './store';
import { Provider } from 'mobx-react';

ReactDOM.render(
    <Provider  {...store}>
        <HashRouter>
            <div>
                <Route exact path="/" component={Home}></Route>
                <Route path="/Apply" component={Apply}></Route>
                <Route path="/details" component={VoteDetails}></Route>
                <Route path="/applyJoin" component={ApplyJoin}></Route>
                <Route path="/signUp" component={SignUp}></Route>
                <Route path="/paySuccess" component={PaySuccess}></Route>
                <Route path="/votingDialog" component={VotingDialog}></Route>
            </div>
        </HashRouter>
        {/* <Router /> */}
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
