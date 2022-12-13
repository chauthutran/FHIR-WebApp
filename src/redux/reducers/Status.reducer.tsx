import * as Constant from '../../constants';
import * as Utils from "../../utils";
import * as ReduxVarType from "../../types";


const initialState: ReduxVarType.StatusDataType = {
	status: "",
	type: "success",
	message: ""
}


const StatusReducer = (state = initialState, action: ReduxVarType.ReduxActionType):ReduxVarType.StatusDataType => {
    
	let newState = Utils.cloneJson( state );
	if( action.type === Constant.FETCH_RESOURCE_TYPE_SUCCESS )
	{
		newState.status = action.type;
		newState.type = "info";
		newState.message = "Data is loaded successfully !";

		return newState;
	}
	else if( action.type === Constant.FETCH_LOGIN_FAILURE )
	{
		newState.status = action.type;
		newState.type = "error";
		newState.message = "Login Failed";

		return newState;
	}
	else if( action.type === Constant.SET_MESSAGE_STATUS )
	{
		newState.status = action.type;
		newState.type = action.payload.type;
		newState.message = action.payload.message;

		return newState;
	}
	else
	{
		return state;
	}
}


export default StatusReducer;