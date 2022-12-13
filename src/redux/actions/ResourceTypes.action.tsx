import * as Constant from "../../constants";
import * as api from "../../api";
import { AppDispatch } from '../../redux/store';
import * as Types from "../../types";

 
export function fetchResourceTypeList(resourceType: string, searchBy: string, searchValue: string): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
   
        dispatch({
            type: Constant.FETCH_RESOURCE_TYPE_REQUEST
        });

        try
        { 
            const responseData: any = await api.getResourceTypeList( resourceType, searchBy, searchValue );
            const status: string = ( responseData.responseData.statusText === "OK" ) ? Constant.FETCH_RESOURCE_TYPE_SUCCESS: Constant.FETCH_RESOURCE_TYPE_FAILURE;
            dispatch({
                type: status,
                payload: responseData
            })
        }
        catch(e)
        {
            dispatch({
                type: Constant.FETCH_RESOURCE_TYPE_FAILURE,
                payload: e
            })
        }
    };
}


export function fetchResourceTypeDetails(resourceType: string, id: string): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
   
        dispatch({
            type: Constant.FETCH_RESOURCE_TYPE_DETAILS_REQUEST
        });

        try
        { 
            const responseDetailsData: any = await api.getResourceTypeDetails( resourceType, id );
            const responseServiceRequests: any = await api.getResourceTypeList("ServiceRequest", "patient", id);

            // const status: string = ( responseDetailsData.responseData.statusText === "OK" ) ? Constant.FETCH_RESOURCE_TYPE_DETAILS_SUCCESS: Constant.FETCH_RESOURCE_TYPE_DETAILS_FAILURE;
            dispatch({
                type: Constant.FETCH_RESOURCE_TYPE_DETAILS_SUCCESS,
                payload: { details: responseDetailsData, services: responseServiceRequests }
            })
        }
        catch(e)
        {
            dispatch({
                type: Constant.FETCH_RESOURCE_TYPE_DETAILS_FAILURE,
                payload: e
            })
        }
    };
}


export function createResourceType(data: Types.JsonType): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
   
        dispatch({
            type: Constant.FETCH_RESOURCE_TYPE_CREATE_REQUEST
        });

        try
        { 
            const responseData: any = await api.createResourceType( data );

            const status: string = ( responseData.responseData.statusText === "OK" ) ? Constant.FETCH_RESOURCE_TYPE_CREATE_SUCCESS: Constant.FETCH_RESOURCE_TYPE_CREATE_FAILURE;

            dispatch({
                type: status,
                payload: responseData
            })
        }
        catch(e)
        {
            dispatch({
                type: Constant.FETCH_RESOURCE_TYPE_DETAILS_FAILURE,
                payload: e
            })
        }
    };
}

export const removeSelectedResourceType = () => {
	
	return {
		type: Constant.REMOVE_SELECTED_RESOURCE_TYPE,
	};
};
