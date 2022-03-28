import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Photo from '../views/photo/photo';
import {LoginPage} from '../views/login/login';
import {Info} from '../views/info/info';
import {Items} from '../views/items/items';
import {AddUser} from '../views/addUser/addUser';
import {AddArea} from '../views/addArea/addArea';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/photo" exact={true} component={Photo} />
                <Route path="/login" exact={true} component={LoginPage} />
                <Route path="/info" exact={true} component={Info} />
                <Route path="/items" exact={true} component={Items} />
                <Route path="/addUser" exact={true} component={AddUser} />
                <Route path="/addArea" exact={true} component={AddArea} />
            </Switch>
        </Router>
    );
};

export default Routes;
