import * as Constant from '../../constants';
import * as Utils from '../../utils';
import * as ReduxVarType from "../../varTypes";


const initialState: ReduxVarType.AppConfigType = {
	"appConfig": {}
}


const AppConfigurationReducer = (state = initialState, action: ReduxVarType.ReduxActionType) => {
	let newState = Utils.cloneJson( state );

	if( action.type === Constant.FETCH_APP_CONFIG_SUCCESS ) 
	{
		newState.appConfig = action.payload.entry[0].resource;
		return newState;
	}

	return state;
	
}

export default AppConfigurationReducer;
