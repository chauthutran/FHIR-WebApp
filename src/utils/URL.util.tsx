export const PAGE_SIZE = 30;
export const PAGE_INDEX = 0;


// export const APP_CONFIGURATION_URL = `${Constant.APP_FHIR_API_BASE_URL}Composition?_format=json&identifier=`;

let APP_FHIR_API_BASE_URL: string = "http://localhost:8080/fhir/";

// https://hapi.fhir.org/baseR4/
export const setBaseUrl = ( url: string ) =>{
    APP_FHIR_API_BASE_URL = url;
}


// https://hapi.fhir.org/baseR4/<Patient>?_count=5&_getpagesoffset=1&<searchBy>=<searchValue>
export const getResourceTypeList = (resourceType: string, searchBy: string, searchValue: string) =>{
    let queryUrl: string = `${APP_FHIR_API_BASE_URL}${resourceType}?_format=json&_count=${PAGE_SIZE}&_getpagesoffset=${PAGE_INDEX}`;
    if( searchBy !== undefined )
    {
        queryUrl += `&${searchBy}=${searchValue}`;
    }
    console.log(APP_FHIR_API_BASE_URL);
    return queryUrl;
}


// https://hapi.fhir.org/baseR4/Patient/<id>
export const getResourceTypeDetails = (resourceType: string, id: string) =>{
    return `${APP_FHIR_API_BASE_URL}${resourceType}\\${id}`;
}


// https://hapi.fhir.org/baseR4/create
export const createResourceType = () =>{
    return `${APP_FHIR_API_BASE_URL}$create`;
}