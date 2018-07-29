import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Listmain from './Listmain';
import Detail from './Detail';


const Total = () => (
    <Switch>
        <Route exact path='/list' component={Listmain} />
        <Route path='/list/:id' component={Detail} />
    </Switch>
)

export default Total;
