import axios from "axios";
import * as Utils from "../utils";


export const getAppConfiguration = async( appId: string) => {

    const url: string = `${Utils.APP_CONFIGURATION_URL}${appId}`;
    const responseData: any = await axios.get(url);
console.log(responseData);
    return responseData;
}