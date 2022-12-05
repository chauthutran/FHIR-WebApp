
interface ReduxActionType { type?: string, payload?: any };
interface AppConfigType { appConfig?: object, loaded: false };
interface StatusDataType { status: string, type: string, message: string };



// interface PatientType { name: any, gender: string, birthDate: Date, address: any };
interface PatientInfoType {id: string, fullName: string, birthDate: string, gender: string };
interface PatientServiceType  {id: string, codes: {code: string, display: string}[]};
interface PatientDetailsType {details: PatientInfoType, services: PatientServiceType[]};


export type {ReduxActionType, AppConfigType, StatusDataType, PatientInfoType, PatientServiceType, PatientDetailsType};