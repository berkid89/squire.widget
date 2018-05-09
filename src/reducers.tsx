import { combineReducers } from 'redux';

import * as actions from './actions';

const widgetReducer = (state = {
    settings: null,
    software: null,
    requestCount: 0
}, action) => {
    switch (action.type) {
        case actions.GET_VERSIONINFO_FINISHED:
            return {
                ...state,
                softwareId: action.softwareId
            };
        case actions.INCREASE_REQUEST_COUNTER:
        case actions.DECREASE_REQUEST_COUNTER: {
            return {
                ...state,
                requestCount: state.requestCount + action.payload
            };
        }
        case actions.LOAD_SETTINGS_FINISHED:
            return {
                ...state,
                settings: {
                    ...action.payload
                }
            };
        default:
            return state;
    }
}

export default combineReducers({
    widgetReducer
})