import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Total from './Routes/Total';
import Home from './Routes/Home';
import About from './Routes/About';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/list' component={Total} />
            <Route path='/about' component={About} />
        </Switch>

    </div>
)

export default Main;
