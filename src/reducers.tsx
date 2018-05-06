import { combineReducers } from 'redux';

import * as actions from './actions';

const widgetReducer = (state = {
    softwareId: null
}, action) => {
    switch (action.type) {
        case actions.GET_VERSIONINFO:
            return {
                ...state,
                softwareId: action.softwareId
            };
        default:
            return state;
    }
}

export default combineReducers({
    widgetReducer
})