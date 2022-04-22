import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Photo from '../views/photo/photo';
import {LoginPage} from '../views/login/login';
import {LoginPage as SuperLoginPage} from '../views/login/login2';
import {Info} from '../views/info/info';
import {Items} from '../views/items/items';
import {Items2} from '../views/items/items_normal';
import {AddUser} from '../views/addUser/addUser';
import {AddArea} from '../views/addArea/addArea';
import {UserList} from '../views/userList/userList';
import {DownloadReport} from '../views/downloadReport';
import {DownloadReport2} from '../views/downloadReport/normal';
import {Home} from '../views/home';

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route path="/home" exact={true} component={Home} />
                <Route path="/photo" exact={true} component={Photo} />
                <Route path="/login" exact={true} component={LoginPage} />
                <Route path="/superLogin" exact={true} component={SuperLoginPage} />
                <Route path="/info" exact={true} component={Info} />
                <Route path="/items" exact={true} component={Items} />
                <Route path="/items_normal" exact={true} component={Items2} />
                <Route path="/addUser" exact={true} component={AddUser} />
                <Route path="/addArea" exact={true} component={AddArea} />
                <Route path="/userList" exact={true} component={UserList} />
                <Route path="/downloadReport" exact={true} component={DownloadReport} />
                <Route path="/downloadReport2" exact={true} component={DownloadReport2} />
            </Switch>
        </Router>
    );
};

export default Routes;
