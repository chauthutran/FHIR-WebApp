import * as Constant from '../../constants';
import * as Utils from '../../utils';
import * as ReduxVarType from "../../types";


const initialState: any = { };


const ResourceTypeReducer = (state = initialState, action: ReduxVarType.ReduxActionType) => {
	let newState = Utils.cloneJson( state );

	console.log(action.type);
	if( action.type === Constant.FETCH_RESOURCE_TYPE_SUCCESS ) 
	{
		const type = action.payload.type;
		const dataList: [] = action.payload.responseData.data.entry;
		
		newState[type] = dataList;
		
		return newState;
	}
	if( action.type === Constant.FETCH_RESOURCE_TYPE_DETAILS_SUCCESS ) 
	{
		const type = action.payload.details.type;
		if( newState[type] == undefined )
		{
			newState[type] = [];
		}

		newState[type].selected = { 
			details: action.payload.details.responseData.data, 
			services:action.payload.services.responseData.data.entry 
		} ;

		return newState;
	}
	// else
	// {
		return state;
	// }
}

export default ResourceTypeReducer;
