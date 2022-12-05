import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Constant from "../../constants";
import * as api from "../../api";
import { AppDispatch, AppState } from '../../redux/store';

export function fetchAppConfiguration(appId: string): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
   
        dispatch({
            type: Constant.FETCH_APP_CONFIG_REQUEST
        });

        try
        { 
            const configData: any = await api.getAppConfiguration( appId );
            const status: string = ( configData.total > 0 ) ? Constant.FETCH_APP_CONFIG_SUCCESS: Constant.FETCH_APP_CONFIG_FAILURE;
            dispatch({
                type: status,
                payload: configData
            })
        }
        catch(e)
        {
            dispatch({
                type: Constant.FETCH_APP_CONFIG_FAILURE,
                payload: e
            })
        }
    };
}

