import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Constant from "../../constants";
import * as api from "../../api";
import { AppDispatch, AppState } from '../../redux/store';

export function login(name: string, pwd: string): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
   
        dispatch({
            type: Constant.FETCH_LOGIN_REQUEST
        });

        try 
        { 
            let valid: boolean = false;
            let responseData: any = await api.getResourceTypeList( "Organization", "name", name );
            responseData = responseData.responseData;
            const orgUnitData = responseData.data.entry[0].resource;

            if( responseData.statusText == "OK" && responseData.data.total > 0 )
            {
                const extensions = orgUnitData.extension;
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
            
            if( valid )
            {
                const condigData: any = await api.getAppConfiguration( orgUnitData.name );
                dispatch({
                    type: Constant.FETCH_LOGIN_SUCCESS,
                    payload: { config: condigData, orgUnit: orgUnitData }
                })
            }
            else
            {
                dispatch({
                    type: Constant.FETCH_LOGIN_FAILURE,
                    payload: orgUnitData
                })
            }

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

