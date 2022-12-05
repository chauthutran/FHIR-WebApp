import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Constant from "../../constants";
import * as api from "../../api";
import { AppDispatch, AppState } from '../../redux/store';

type AppThunk = ThunkAction<
  void,
  AppState,
  null,
  Action<string>
>;
 
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
