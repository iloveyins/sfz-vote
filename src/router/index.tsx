import React from 'react';
import { Router } from 'react-router'
import routing, { history } from '../store/routing';
import routes from '../routes/Root';

const Root = () => {
    return (
        <Router history={history}></Router>
    )
}

export default Root;