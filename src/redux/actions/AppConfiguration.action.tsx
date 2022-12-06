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


export function login(name: string, pwd: string): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
   
        dispatch({
            type: Constant.FETCH_LOGIN_REQUEST
        });

        try
        { 
            let valid: boolean = false;
            const orgUnitData: any = await api.getResourceTypeList( "Organization", "name", name );
            if( orgUnitData.responseData.statusText == "OK" )
            {
                if( orgUnitData.responseData.data.total > 0 )
                {
                    const extensions = orgUnitData.responseData.data.entry[0].resource.extension;
                    for( let i=0; i<extensions.length; i++ )
                    {
                        const extension = extensions[i];
                        const url: URL = new URL(extension.url);
                        const hash: string = url.hash;
                        if( hash == "#password" && extension.valueCode === pwd )
                        {
                            valid = true;
                            break;
                        }
                    }
                }
            }
            

            const status: string = ( valid ) ? Constant.FETCH_LOGIN_SUCCESS : Constant.FETCH_LOGIN_FAILURE;
            dispatch({
                type: status,
                payload: orgUnitData
            })
        }
        catch(e)
        {
            dispatch({
                type: Constant.FETCH_LOGIN_FAILURE,
                payload: e
            })
        }
    };
} 

