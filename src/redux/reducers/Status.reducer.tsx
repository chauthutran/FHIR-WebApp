
import * as Constant from '../../constants';
import * as Utils from "../../utils";
import * as ReduxVarType from "../../types";

import { AppState } from '../store';

const initialState: ReduxVarType.StatusDataType = {
	status: "",
	type: "",
	message: ""
}


const StatusReducer = (state = initialState, action: ReduxVarType.ReduxActionType):ReduxVarType.StatusDataType => {
    
	let newState = Utils.cloneJson( state );
	if( action.type === Constant.FETCH_RESOURCE_TYPE_SUCCESS )
	{
		newState.status = action.type;
		newState.type = "info";
		newState.message = "Data is loaded successfully !";

		console.log( "=== StatusReducer : " );
		console.log(  newState  );
		console.log( "======================================" );

		return newState;
	}
	else
	{
		return state;
	}
}


export default StatusReducer;