import * as Constant from '../../constants';
import * as Utils from '../../utils';
import * as ReduxVarType from "../../types";


const initialState: ReduxVarType.AppConfigType = {
	"data": {
		"orgUnit": {"name" : ""},
		"config": {}
	},
	"loaded": false
}


const AppConfigurationReducer = (state = initialState, action: ReduxVarType.ReduxActionType) => {
	let newState = Utils.cloneJson( state );

	if( action.type === Constant.FETCH_LOGIN_SUCCESS ) 
	{
		newState.data = action.payload;
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
