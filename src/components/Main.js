import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Total from './Total';
import Home from './Home';
import Other from './Other';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/list' component={Total} />
            <Route path='/other' component={Other} />
        </Switch>

    </div>
)

export default Main;
