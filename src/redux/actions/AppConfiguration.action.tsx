import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Types from "../../varTypes"
import * as Constant from "../../constants";
import * as api from "../../api";
import { AppState } from '../../redux/store';

type AppThunk = ThunkAction<
  void,
  AppState,
  null,
  Action<string>
>;

export const fetchAppConfiguration = (appId: string): AppThunk  =>  async dispatch => {
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

  

