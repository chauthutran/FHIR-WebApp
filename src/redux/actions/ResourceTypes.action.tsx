import { Dispatch } from "redux";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import * as Constant from "../../constants";
import * as api from "../../api";
import { AppDispatch, AppState } from '../../redux/store';
import { ReduxActionType } from "../../varTypes";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

type AppThunk = ThunkAction<
  void,
  AppState,
  null,
  Action<string>
>;

// export const useAppDispatch: () => AppDispatch = useDispatch;

export function fetchResourceTypeList(resourceType: string, searchBy: string, searchValue: string): (dispatch: AppDispatch) => Promise<void> {
    return async (dispatch: AppDispatch) => {
    //   // Signal work in progress.
    //   dispatch(signInInProgress());
  
    //   try {
    //     await signInToApi();
  
    //     dispatch(signInSuccess());
    //   } catch (err) {
    //     dispatch(signInFail(err));
    //   }

    // const dispatch = useAppDispatch();
console.log(dispatch);
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
            
            // dispatch({
            //     // type: status,
            //     type: Constant.FETCH_RESOURCE_TYPE_SUCCESS,
            //     payload: {
            //         responseData: {
            //             data:{  entry:[] }
                        
            //         }
            //     }
            // })
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

// export const fetchResourceTypeList = (resourceType: string, searchBy: string, searchValue: string): AppThunk  =>  async dispatch => {
//     dispatch({
//         type: Constant.FETCH_RESOURCE_TYPE_REQUEST
//     });

//     try
//     { 
//         const responseData: any = await api.getResourceTypeList( resourceType,searchBy, searchValue );
//         const status: string = ( responseData.responseData.statusText === "OK" ) ? Constant.FETCH_RESOURCE_TYPE_SUCCESS: Constant.FETCH_RESOURCE_TYPE_FAILURE;
//         dispatch({
//             type: status,
//             payload: responseData
//         })
       
//         // dispatch({
//         //     // type: status,
//         //     type: Constant.FETCH_RESOURCE_TYPE_SUCCESS,
//         //     payload: {
//         //         responseData: {
//         //             data:{  entry:[] }
                   
//         //         }
//         //     }
//         // })
//     }
//     catch(e)
//     {
//         dispatch({
//             type: Constant.FETCH_RESOURCE_TYPE_FAILURE,
//             payload: e
//         })
//     }
// };

  

