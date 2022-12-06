import * as Constant from "../constants";


export const PAGE_SIZE = 30;
export const PAGE_INDEX = 1;


export const APP_CONFIGURATION_URL = `${Constant.APP_FHIR_API_BASE_URL}Composition?_format=json&identifier=`;


// https://hapi.fhir.org/baseR4/<Patient>?_count=5&_getpagesoffset=1&<searchBy>=<searchValue>
export const getResourceTypeList = (resourceType: string, searchBy: string, searchValue: string) =>{
    let queryUrl: string = `${Constant.APP_FHIR_API_BASE_URL}${resourceType}?_format=json&_count=${PAGE_SIZE}&_getpagesoffset=${PAGE_INDEX}`;
    if( searchBy !== undefined )
    {
        queryUrl += `&${searchBy}=${searchValue}`;
    }
    
    return queryUrl;
}


// https://hapi.fhir.org/baseR4/Patient/<id>
export const getResourceTypeDetails = (resourceType: string, id: string) =>{
    return `${Constant.APP_FHIR_API_BASE_URL}${resourceType}\\${id}`;
}

