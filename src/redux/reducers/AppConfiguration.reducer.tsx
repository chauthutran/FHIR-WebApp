import * as Constant from '../../constants';
import * as Utils from '../../utils';
import * as ReduxVarType from "../../types";


const initialState: ReduxVarType.AppConfigType = {
	"data": {
		"orgUnit": {"name" : ""}
	},
	"loaded": false
}


const AppConfigurationReducer = (state = initialState, action: ReduxVarType.ReduxActionType) => {
	let newState = Utils.cloneJson( state );

	// if( action.type === Constant.FETCH_APP_CONFIG_SUCCESS ) 
	// {
	// 	newState.appConfig = {};
	// 	newState.loaded = true;
	// 	return newState;
	// } else 
	if( action.type === Constant.FETCH_LOGIN_SUCCESS ) 
	{
		newState.data = { orgUnit: action.payload };
		newState.loaded = true;
		console.log(newState.appConfig);
		return newState;
	}
	else
	{
		return state;
	}
	
}

export default AppConfigurationReducer;
