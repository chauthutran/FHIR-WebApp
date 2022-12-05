
import * as Constant from '../../constants';
import * as Utils from "../../utils";
import * as ReduxVarType from "../../varTypes";


const initialState: ReduxVarType.StatusDataType = {
	status: "",
	type: "",
	message: ""
}


const StatusReducer = (state = initialState, action: ReduxVarType.ReduxActionType) => {
    let newState = Utils.cloneJson( state );

    return newState;
}


export default StatusReducer;