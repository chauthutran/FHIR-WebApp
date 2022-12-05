import React, { FunctionComponent, useEffect } from 'react'; // importing FunctionComponent

import * as Constant from "../constants";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchAppConfiguration } from '../redux';
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import { AppState } from '../redux/store';
import PatientComponent from './PatientList.component';

type SearchAppConfigType = {
	statusData: ReduxVarType.StatusDataType,
	appConfigData: ReduxVarType.AppConfigType,
	resourceTypeList: any,
	fetchAppConfiguration: any
};

const SearchAppConfig: FunctionComponent<SearchAppConfigType> = ({statusData, appConfigData, resourceTypeList, fetchAppConfiguration}) => {

	let userCode: string = "";
	const handleOnChange = (event: any) => {
		userCode = event.target.value;
	};

	const handleOnClick = (event: any) => {
		fetchAppConfiguration(userCode);
	};

	return (
		<div>
			<div>User code</div>
			<div><TextField onChange={(event: any) => handleOnChange(event)} /></div>

			<div>PIN</div>
			<div><TextField /></div>

			<Button variant="contained" onClick={(event: any) => handleOnClick(event)}>Log in</Button>

		</div>
	);
}


const mapStateToProps = (state: AppState) => {
    return {
		appConfigData: state.appConfigData,
        statusData: state.statusData,
		resourceTypeList: state.resourceTypeList,
    };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchAppConfiguration: (userCode: string) => dispatch(fetchAppConfiguration(userCode))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppConfig);
