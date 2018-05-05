import * as widgetActions from '../actions/widget';

const widgetReducer = (state = {
    softwareId: null
}, action) => {
    switch (action.type) {
        case widgetActions.GET_VERSIONINFO:
            return {
                ...state,
                softwareId: action.softwareId
            };
        default:
            return state;
    }
}

export default widgetReducer;