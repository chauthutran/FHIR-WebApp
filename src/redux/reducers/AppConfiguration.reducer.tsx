import * as Constant from '../../constants';
import * as Utils from '../../utils';
import * as ReduxVarType from "../../varTypes";


const initialState: ReduxVarType.AppConfigType = {
	"appConfig": {},
	"loaded": false
}


const AppConfigurationReducer = (state = initialState, action: ReduxVarType.ReduxActionType) => {
	let newState = Utils.cloneJson( state );

	if( action.type === Constant.FETCH_APP_CONFIG_SUCCESS ) 
	{
		newState.appConfig = {};
		newState.loaded = true;
		return newState;
	}
	else
	{
		return state;
	}
	
}

export default AppConfigurationReducer;
