import React, { FunctionComponent } from 'react'; // importing FunctionComponent


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchAppConfiguration } from '../redux';
import { connect } from "react-redux";
import * as ReduxVarType from "../varTypes";

type SearchAppConfigType = {
	statusData: ReduxVarType.StatusDataType,
	appConfigData: ReduxVarType.AppConfigType,
	fetchAppConfiguration: any
};

const SearchAppConfig: FunctionComponent<SearchAppConfigType> = ({statusData, appConfigData, fetchAppConfiguration}) => {

	let appId: string = "";
	const handleOnChange = (event: any) => {
		appId = event.target.value;

	};

	const handleOnClick = (event: any) => {
		
		alert( appId );
		fetchAppConfiguration(appId);
	};

	return (
		<div>
			<div>Application ID</div>
			<div><TextField onChange={(event: any) => handleOnChange(event)} /></div>

			<Button variant="contained" onClick={(event: any) => handleOnClick(event)}>Load Configurations</Button>
    
		</div>
	);

}

const mapStateToProps = (state: any) => {
    return {
		appConfigData: state.appConfigData,
        statusData: state.statusData
    };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchAppConfiguration: (appId: string) => dispatch(fetchAppConfiguration(appId))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppConfig);
