import axios from "axios";
import * as Utils from "../utils";


export const getResourceTypeList = async( resourceType: string) => {

    const queryUrl: string = Utils.getResourceTypeList(resourceType);
    // const responseData: any = await axios.get(queryUrl);

    let responseData;

    try {
        responseData = await axios({
            method: 'GET',
            url: queryUrl
        });

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }


    return {
        type: resourceType,
        responseData
    }
}