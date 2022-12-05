import * as Constant from '../../constants';
import * as Utils from '../../utils';
import * as ReduxVarType from "../../varTypes";


const initialState: any = { };


const ResourceTypeReducer = (state = initialState, action: ReduxVarType.ReduxActionType) => {
	let newState = Utils.cloneJson( state );

	if( action.type === Constant.FETCH_RESOURCE_TYPE_SUCCESS ) 
	{
		const type = action.payload.type;
		const dataList = action.payload.responseData.data.entry;
		
		newState[type] = dataList;
		
		return newState;
	}
	// else
	// {
		return state;
	// }
}

export default ResourceTypeReducer;
