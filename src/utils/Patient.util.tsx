
import * as Types from "../types";

export const getPatientItemInfo = ( data: any ) => {
    const id = data.id;
    
    const name = data.name[0];
    const birthDate = data.birthDate;
    const gender = data.gender;

    let fullName = ( name.given ) ? name.given[0] : "";
    fullName += " " + name.family;
    

    const patientData: Types.JsonType = { id, fullName, birthDate, gender };
    return patientData;
}

export const getPatientDetailsInfo = ( data: any ) => {
    let details: Types.JsonType = getPatientItemInfo( data.details );

    let services = [];
    for( let i=0; i<data.services.length; i++ )
    {
        const serviceData = data.services[i].resource;

        let codes: {code: string, display: string}[] = [];
        if( serviceData.category !== undefined )
        {
            for( let j=0; j<serviceData.category.length; j++ )
            {
                const codeData = serviceData.category[j].coding[0];
                codes.push( {code: codeData.code, display: codeData.display });
            }
        }
        let service: Types.PatientServiceType = {id: serviceData.id, codes: codes};
        services.push( service );
    }

    const patientData: Types.PatientDetailsType = { details, services };
    return patientData;
}
