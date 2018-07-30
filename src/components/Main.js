import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Routes/Home';
import List from './Routes/List';
import About from './Routes/About';
import Search from './Routes/Search';

const Main = () => (
    <div>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/list' component={List} />
            <Route path='/about' component={About} />
            <Route path='/search' component={Search} />
        </Switch>

    </div>
)

export default Main;
