import { AlertColor } from "@mui/material";

interface ReduxActionType { type?: string, payload?: any };
interface AppConfigType { data: {orgUnit: {name: string, [key: string]: any}, config: {} }, loaded: false };

// AlertColor 'success' | 'info' | 'warning' | 'error'
interface StatusDataType { status: string, type: AlertColor, message: string };



// interface PatientType { name: any, gender: string, birthDate: Date, address: any };
interface PatientInfoType {id: string, fullName: string, birthDate: string, gender: string };
interface PatientServiceType  {id: string, codes: {code: string, display: string}[]};
interface PatientDetailsType {details: PatientInfoType, services: PatientServiceType[]};


export type {ReduxActionType, AppConfigType, StatusDataType, PatientInfoType, PatientServiceType, PatientDetailsType};