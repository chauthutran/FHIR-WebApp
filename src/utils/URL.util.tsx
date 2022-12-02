
export const PAGE_SIZE = 30;
export const PAGE_INDEX = 1;


export const APP_FHIR_API_BASE_URL = "https://hapi.fhir.org/baseR4/";
export const APP_CONFIGURATION_URL = `${APP_FHIR_API_BASE_URL}Composition?_format=json&identifier=`;


// https://hapi.fhir.org/baseR4/Patient?_count=5&_getpagesoffset=1
export const getResourceTypeList = (resourceType: string) =>{
    return `${APP_FHIR_API_BASE_URL}${resourceType}?_format=json&_count=${PAGE_SIZE}&_getpagesoffset=${PAGE_INDEX}`;
}



