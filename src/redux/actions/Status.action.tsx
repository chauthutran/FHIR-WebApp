
import * as Constant from '../../constants';
import { AppState } from '../../redux/store';

export const resetMessageStatus = () => {
	
	return {
		type: Constant.REMOVE_ERROR_MESSAGE
	};
};


export const setMessageStatus = ( msgData: string ) => {
	
	return {
		type: Constant.SET_MESSAGE_STATUS,
        payload: msgData
	};
};
