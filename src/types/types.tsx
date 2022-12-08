import { AlertColor } from "@mui/material";

interface ReduxActionType { type?: string, payload?: any };
interface AppConfigType { data: {orgUnit: {name: string, [key: string]: any}, config: {menus: [], [key: string]: any}, registrationForm: {[key: string]: any} }, loaded: false };

// AlertColor 'success' | 'info' | 'warning' | 'error'
interface StatusDataType { status: string, type: AlertColor, message: string };



// interface PatientType { name: any, gender: string, birthDate: Date, address: any };
interface JsonType {[key: string]: any };
interface PatientServiceType  {id: string, codes: {code: string, display: string}[]};
interface PatientDetailsType {details: JsonType, services: PatientServiceType[]};


interface FormField { linkId: string, text: string, type: string, [key:string]: any };

export type { ReduxActionType, AppConfigType, StatusDataType, JsonType, PatientServiceType, PatientDetailsType, FormField };