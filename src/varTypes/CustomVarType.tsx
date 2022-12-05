
interface ReduxActionType { type?: string, payload?: any };
interface AppConfigType { appConfig?: object };
interface StatusDataType { status: string, type: string, message: string };



interface PatientType { name: any, gender: string, birthDate: Date, address: any };



export type {ReduxActionType, AppConfigType, StatusDataType, PatientType};