import { loadTranslations, setLocale } from 'react-redux-i18n';
import { GET } from './api';
import { Endpoints } from './constants';

export const GET_VERSIONINFO_FINISHED = "GET_VERSIONINFO_FINISHED";
export const INCREASE_REQUEST_COUNTER = "INCREASE_REQUEST_COUNTER";
export const DECREASE_REQUEST_COUNTER = "DECREASE_REQUEST_COUNTER";
export const LOAD_SETTINGS_FINISHED = "LOAD_SETTINGS_FINISHED";

export const getVerionInfo = (softwareId, envName) => async (dispatch, getState) =>{
	const resp = await GET(dispatch, getState, Endpoints.SHOW, { id: softwareId, envName });
	dispatch(getVerionInfoFinished(resp.data));
};

export const getVerionInfoFinished = (software) => ({
	type: GET_VERSIONINFO_FINISHED,
	payload: software
});


export const increaseRequestCounter = () => ({
	type: INCREASE_REQUEST_COUNTER,
	payload: 1
});

export const decreaseRequestCounter = () => ({
	type: DECREASE_REQUEST_COUNTER,
	payload: -1
});

export const loadSettings = (settingsLocation = "/appsettings.json") => async (dispatch, getState) => {
	const response = await fetch(settingsLocation);
	const settings = await response.json();
	const translations = await readLangFiles(settings.LanguageFiles);
	const language = localStorage.getItem('language');
	const locale = language || settings.DefaultLanguage;
	dispatch(loadTranslations(translations));
	dispatch(setLocale(locale));
	dispatch(loadSettingsFinished(settings));
};

export const loadSettingsFinished = (settings) => {
	return {
		type: LOAD_SETTINGS_FINISHED,
		payload: settings
	};
};

const readLangFiles = async (locationByLanguage) => {
	const langFileList = Object.values(locationByLanguage);
	const loadedLangFiles = await Promise.all(
		langFileList.map(async (file: any) => {
			const loadedFile = await fetch(file);
			const parsedFile = await loadedFile.json();
			return parsedFile;
		})
	);
	const result = {};
	Object.keys(locationByLanguage).forEach((key, i) => (result[key] = loadedLangFiles[i]));
	return result;
};
