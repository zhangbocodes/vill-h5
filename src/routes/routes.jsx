import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Photo from '../views/photo/photo';
import {LoginPage} from '../views/login/login';
import {Info} from '../views/info/info';
import {Items} from '../views/items/items';
import {AddUser} from '../views/addUser/addUser';
import {AddArea} from '../views/addArea/addArea';
import {UserList} from '../views/userList/userList';
import {DownloadReport} from '../views/downloadReport';

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
                <Route path="/userList" exact={true} component={UserList} />
                <Route path="/downloadReport" exact={true} component={DownloadReport} />
            </Switch>
        </Router>
    );
};

export default Routes;
