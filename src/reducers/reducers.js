import { combineReducers } from 'redux';

import auth from './module/auth';
import area from './module/area';

const rootReducer = combineReducers({
    auth,
    area
});

export default rootReducer;
