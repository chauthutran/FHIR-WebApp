import React, { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent
import Alert, { AlertColor } from '@mui/material/Alert';
import * as Constant from "../constants";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { login, resetMessageStatus, setMessageStatus } from '../redux';
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import { AppState } from '../redux/store';
import { Portal, Snackbar } from '@mui/material';

type LoginType = {
	statusData: ReduxVarType.StatusDataType,
	appConfigData: ReduxVarType.AppConfigType,
	resourceTypeList: any,
	login: typeof login,
	resetMessageStatus: typeof resetMessageStatus,
	setMessageStatus: typeof setMessageStatus,
};

const Login: FunctionComponent<LoginType> = ({ statusData, appConfigData, resourceTypeList, login, resetMessageStatus, setMessageStatus }) => {

	// let logInData: {[name: string]: string} = {name: "", pwd: ""};
	const [name, setName] = useState("GT2_TEST_IPC");
	const [password, setPassword] = useState("1234");

	useEffect(() => {
		
	}, [statusData]);

	const handleOnClick = (event: any) => {
		event.preventDefault();
		if( name != "" && password !== "" )
		{
			login( name, password );
		}
		else
		{
			setMessageStatus("Please enter username/password", "error");
		}
	};

	const handleCloseAlert = () => {
		resetMessageStatus();
	}

	return (
		<div>
			
			{/* {( statusData.status === Constant.FETCH_LOGIN_REQUEST  
					|| statusData.status === Constant.FETCH_LOGIN_FAILURE 
					|| statusData.status === Constant.SET_MESSAGE_STATUS ) &&  <Portal> */}
				{statusData.message != "" &&  <Portal>
						<Snackbar
							anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
							open={statusData.message !=""}
						>
							<Alert onClose={() => handleCloseAlert()} severity={statusData.type} variant="filled">
								{statusData.message}
							</Alert>
						</Snackbar>
					</Portal> }

			<div>User code</div>
			<div><TextField name="name" onChange={(event: any) => setName(event.target.value)} defaultValue="GT2_TEST_IPC" /></div>

			<div>PIN</div>
			<div><TextField name="pwd" type="password" onChange={(event: any) => setPassword(event.target.value)} defaultValue="1234" /></div>

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
		login: (name: string, pwd: string) => dispatch(login(name, pwd)),
		resetMessageStatus: () => dispatch(resetMessageStatus()),
		setMessageStatus: (msg: string, type: AlertColor) => dispatch(setMessageStatus(msg, type)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
