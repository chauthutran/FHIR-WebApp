
import * as Constant from '../../constants';
import { AlertColor } from "@mui/material";

export const resetMessageStatus = () => {
	
	return {
		type: Constant.REMOVE_ERROR_MESSAGE
	};
};


export const setMessageStatus = ( msg: string, type: AlertColor ) => {
	
	return {
		type: Constant.SET_MESSAGE_STATUS,
        payload: { message: msg, type: type }
	};
};
