import axios from 'axios';
import * as actions from './actions';
const queryString = require('query-string');

const createConfig = (getState) => {
    const { BackendServiceURL, APIVersion } = getState().app.settings;
    const { locale } = getState().i18n;
    return {
        "baseURL": BackendServiceURL + APIVersion,
        "withCredentials": true,
        "headers": {
            "Accept-Language": locale,
            "Content-Type": "application/json; charset=UTF-8",
            "Pragma": "no-cache"
        }
    };
};

const mapResponse = (res, requestError = null) => {
    return {
        headers: res.headers,
        status: res.status,
        statusText: res.statusText,
        data: res.data ? (res.data.data ? res.data.data : res.data) : null,
        errors: res.data ? res.data.errors : null,
        requestError
    };
};

const needRedirectTo = (res) => {
    if (!res || !res.status)
        throw new Error("Internal server error");
    else if (res.status === 401 || res.status === 403)
        throw new Error("Access denied");

    return null;
};

const checkAndReturnResponse = (response, error, dispatch) => {
    const res = response || (error && error.response) || null;
    needRedirectTo(res);
    return mapResponse(res || {}, error);
};

const callRequest = async (axiosMethod, methodParams, dispatch, getState, extraCfg = {}) => {
    const method = axiosMethod.bind(axios);
    try {
        dispatch(actions.increaseRequestCounter());
        const cfg = { ...createConfig(getState), ...extraCfg };
        const res = await method(...methodParams, cfg);
        return checkAndReturnResponse(res, null, dispatch);
    } catch (e) {
        return checkAndReturnResponse(null, e, dispatch);
    } finally {
        dispatch(actions.decreaseRequestCounter());
    }
};

const urlWithQuerystring = (url, queryParams) => {
    const qs = queryParams ? queryString.stringify(queryParams) : '';
    const urlWithParams = qs ? url + '?' + qs : url;
    return urlWithParams;
};

export async function GET(dispatch, getState, url, queryParams) {
    const urlWithParams = urlWithQuerystring(url, queryParams);
    return callRequest(axios.get, [urlWithParams], dispatch, getState);
}

export async function DELETE(dispatch, getState, url, queryParams) {
    const urlWithParams = urlWithQuerystring(url, queryParams);
    return callRequest(axios.delete, [urlWithParams], dispatch, getState);
}

export async function POST(dispatch, getState, url, data) {
    return callRequest(axios.post, [url, data], dispatch, getState);
}

export async function PUT(dispatch, getState, url, data) {
    return callRequest(axios.put, [url, data], dispatch, getState);
}

export async function DOWNLOAD(dispatch, getState, url, data) {
    const config = { responseType: 'blob' };
    let res = callRequest(axios.post, [url, data], dispatch, getState, config);
    return res;
}

export const createDownloadLink = (fileName, uri, blob) => {
    let link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); // Firefox requires the link to be in the body
        link.download = fileName;
        link.href = uri;
        link.click();
        document.body.removeChild(link); // remove the link when done
    } else {
        if (navigator.appVersion.toString().indexOf('.NET') > 0 && blob)
            window.navigator.msSaveBlob(blob, fileName);
        else
            location.replace(uri);
    }
}

export const getFileNameFromHeader = (header) => {
    const contentDisposition = header["content-disposition"];
    return contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
}
