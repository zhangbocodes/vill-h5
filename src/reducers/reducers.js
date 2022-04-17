import { combineReducers } from 'redux';

import auth from './module/auth';
import area from './module/area';
import times from './module/times';

const rootReducer = combineReducers({
    auth,
    area,
    times
});

export default rootReducer;
