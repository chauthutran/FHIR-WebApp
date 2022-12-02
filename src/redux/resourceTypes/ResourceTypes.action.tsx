import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Constant from "../../constants";
import * as api from "../../api";

type AppThunk = ThunkAction<
  void,
  any,
  null,
  Action<string>
>;

export const fetchResourceTypeList = (resourceType: string): AppThunk  =>  async dispatch => {
    dispatch({
        type: Constant.FETCH_RESOURCE_TYPE_REQUEST
    });

    try
    { 
        const responseData: any = await api.getResourceTypeList( resourceType );
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

  

