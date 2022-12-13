import { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent
import Alert, { AlertColor } from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import { login, resetMessageStatus, setMessageStatus } from '../redux';
import { connect } from "react-redux";
import * as Types from "../types";
import { AppState } from '../redux/store';
import { Portal, Snackbar } from '@mui/material';
import "../styles/style.css";


type LoginType = {
	statusData: Types.StatusDataType,
	appConfigData: Types.AppConfigType,
	resourceTypeList: any,
	login: typeof login,
	resetMessageStatus: typeof resetMessageStatus,
	setMessageStatus: typeof setMessageStatus,
};

const Login: FunctionComponent<LoginType> = ({ statusData, appConfigData, resourceTypeList, login, resetMessageStatus, setMessageStatus }) => {

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
		<div id="loginFormDiv">
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
			

			<div className="wrapper_login">
				<div className="login_header">
					<div className="login_logo__image"></div>
					<div className="login_title">PSI - workforce app</div>
				</div>

				<div className="login_data">
					<div className="login_data__fields">
						<div id="loginField" className="field" style={{backgroundColor: "white", border: "0px" }}>
							<div className="field__label">
								<label>User code</label><span>*</span>
							</div>
							<div className="field__controls">
								<div className="field__left" style={{width: "100%"}}>
									<TextField name="name" onChange={(event: any) => setName(event.target.value)} defaultValue="GT2_TEST_IPC" />
								</div>
								<div className="field__right"></div>
							</div>
						</div>
						<div className="field pin">
							<div className="field__label">
								<label>PIN</label><span>*</span>
							</div>
							<div className="field__controls">
								<div className="field__left" style={{width: "100%"}}>
									<TextField name="pwd" type="password" onChange={(event: any) => setPassword(event.target.value)} defaultValue="1234" />
								</div>
								<div className="field__right"></div>
							</div>
						</div>
					</div>
					<div id="divAppVersion" className="login_data__more" style={{textAlign: "left"}}>
						<div>
							<label id="spanVersion" style={{color: "#999999", fontWeight: "350"}}>Version 0.1 SNAPSHOT</label>
							<label id="spanVerDate" style={{marginLeft: "7px", color: "#999999", fontWeight: "350"}}> [2022-12-16]</label>
						</div>
					</div>
				</div>

				<div className="login_buttons login_cta">
					<div className="login_buttons__container">
						<div className="button l-emphasis button-full_width mouseDown" id="advanceOptionLoginBtn">
							<div className="button__container">
								<div className="button-label">Options</div>
							</div>
						</div>
						<div className="button h-emphasis button-full_width loginBtn mouseDown" >
							<div className="button__container ">
								<div className="button-label" onClick={(event: any) => handleOnClick(event)} >LOG IN</div>
							</div>
						</div>
					</div>
				</div>
			</div>
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
