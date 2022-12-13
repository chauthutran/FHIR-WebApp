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
		let dataList: [] = action.payload.responseData.data.entry;
		if( !dataList )
		{
			dataList = [];
		}
		
		newState[type] = dataList;
		
		return newState;
	}
	if( action.type === Constant.FETCH_RESOURCE_TYPE_DETAILS_SUCCESS ) 
	{
		let services = action.payload.services.responseData.data.entry;
		services = ( services ) ? services : [];
		newState.selected = { 
			details: action.payload.details.responseData.data, 
			services
		} ;

		return newState;
	}
	else if( action.type === Constant.FETCH_RESOURCE_TYPE_CREATE_SUCCESS )
	{
		const data = action.payload;
		const type = data.resourceType;
		
		if( !newState[type] ) 
		{
			newState[type] = {};
		}
		newState[type].push( data );

		delete newState.selected;
		newState.selected = data;

		return newState;
	}
	else if( action.type === Constant.REMOVE_SELECTED_RESOURCE_TYPE )
	{
		delete newState.selected;
		return newState;
	}
	// else
	// {
		return state;
	// }
}

export default ResourceTypeReducer;
