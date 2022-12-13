import axios from "axios";
import * as Utils from "../utils";
import * as Types from "../types";


export const getResourceTypeList = async( resourceType: string, searchBy: string, searchValue: string) => {

    const queryUrl: string = Utils.getResourceTypeList(resourceType, searchBy, searchValue);

    let responseData;
    try {
        responseData = await axios({
            method: 'GET',
            url: queryUrl
        });

    } catch (err) {
        console.error(err);
    }
    
    return {
        type: resourceType,
        responseData
    }
};


export const getResourceTypeDetails = async( resourceType: string, id: string) => {

    const queryUrl: string = Utils.getResourceTypeDetails(resourceType, id);
    let responseData;

    try {
        responseData = await axios({
            method: 'GET',
            url: queryUrl
        });

    } catch (err) {
        console.error(err);
    }

    return {
        type: resourceType,
        responseData
    }
}


export const createResourceType = async( data: Types.JsonType ) => {

    const queryUrl: string = Utils.createResourceType();
    let responseData;

    try {
        responseData = await axios({
            method: 'POST',
            url: queryUrl,
            data: data
        });
        
    } catch (err) {
        console.error(err);
    }

    return responseData;
}
