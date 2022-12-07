import axios from "axios";
import * as Utils from "../utils";


export const getAppConfiguration = async( appId: string) => {

//     const url: string = `${Utils.APP_CONFIGURATION_URL}${appId}`;
//     const responseData: any = await axios.get(url);
// console.log(responseData);
//     return responseData;

    // const responseData: any = await axios.get("../config.json");
    // console.log(responseData);
    // return responseData;

    
    let responseData;
    try {
        responseData = await axios({
            method: 'GET',
            url: "../configuration.json"
        });
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }


    return responseData;
}