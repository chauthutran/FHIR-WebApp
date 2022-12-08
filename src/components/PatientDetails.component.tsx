import React, { FunctionComponent, useEffect, useState } from 'react'; 
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import * as Constant from "../constants";
import { AppState } from '../redux/store';
import * as Utils from "../utils";
import * as Types from "../types";
import SubAppBarComponent from './appBar/SubAppBar.component';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormComponent from './Form.component';


type PatientDetailsType = {
	statusData: ReduxVarType.StatusDataType,
	resourceTypeList: any,
	appConfigData: ReduxVarType.AppConfigType
};

const PatientDetails: FunctionComponent<PatientDetailsType> = ({statusData, resourceTypeList, appConfigData}) => {

    const patientData: Types.PatientDetailsType = Utils.getPatientDetailsInfo( resourceTypeList.selected );

    // const renderPatientData = () => {

    //     console.log(patientData);
    //     return (
    //         <> 
    //             <SubAppBarComponent />

    //             <div>
    //                 <p>- Full Name: {patientData.details.fullName}</p>
    //                 <p>- Birthdate: {patientData.details.birthDate}</p>
    //                 <p>- Gender: {patientData.details.gender}</p>
    //             </div>

    //             <div>Service Details</div>
    //             <div>
    //                 {renderService(patientData.services)}
    //             </div> 
    //         </>
    //     )

    // };

    // const renderService = (services: Types.PatientServiceType[]) => {
    //     let result = []; // Need to conver this one become $("<div></div>"), remenber to add JQuery libs
    //     for( let i=0; i<services.length; i++ )
    //     {
    //         const serviceData = services[i];
    //         let codeListTags = [];
    //         for( let j=0; j<serviceData.codes.length; j++ )
    //         {
    //             const data = serviceData.codes[j];
    //             const key = serviceData.id + "_" + data.code;
    //             codeListTags.push( <p key={key}>{data.display}: {data.code}</p> );
    //         }

    //         result.push(<div id={serviceData.id} key={serviceData.id}>{codeListTags}</div>);
    //     }

    //     return result;
    // }

    // const renderForm = () => {
    //     let form: any = [];
    //     const registerForm = appConfigData.data.registrationForm;
    //     console.log(registerForm);
    //     for( let i=0; i< registerForm.item.length; i++ )
    //     {
    //         const itemData =  registerForm.item[i];
            
    //         if( itemData.type == "group" )
    //         {
    //             form.push( renderGroupItem(itemData) );

    //             for( let j=0; j< itemData.item.length; j++ )
    //             {
    //                 const subItemData = itemData.item[j];
    //                 form.push( renderBasedItem( subItemData ) );
    //             }
    //         }

    //     }

    //     return form;
    // }

    // const renderBasedItem = (item: Types.FormField ) => {
    //     // group | display | boolean | decimal | integer | date | dateTime
    //     if( item.type == "boolean" )
    //     {
    //         const id = item.id;
    //         const lableId = item.id + "_label";
    //         return( 
    //             <FormControl fullWidth>
    //                 <InputLabel id={lableId}>item.text</InputLabel>
    //                 <Select 
    //                     labelId={lableId} 
    //                     id={id} 
    //                     value={patientData.details[item.id]} 
    //                     label={item.text}
    //                     // onChange={handleChange}
    //                 > 
    //                     <MenuItem value="">[Please select]</MenuItem>
    //                     <MenuItem value="true">Yes</MenuItem>
    //                     <MenuItem value="false">No</MenuItem>
    //                     </Select>
    //             </FormControl> )

    //     }
    //     // else if( item.type == "decimal" )
    //     // {

    //     // }
    //     // else if( item.type == "integer" )
    //     // {

    //     // }
    //     // else if( item.type == "date" )
    //     // {

    //     // }
    //     // else if( item.type == "dateTime" )
    //     // {

    //     // }
    //     return (
    //         <TextField
    //             required={item.required}
    //             id={item.id}
    //             label={item.text}
    //             defaultValue={patientData.details[item.id]}
    //         />
    //     )
    // }

    // const renderGroupItem = ( item: Types.FormField ) => {
    //     return (
    //         <>
    //             <Typography component="div" sx={{ flexGrow: 1 }}>
    //                 {item.text}
    //             </Typography>
    //         </>
    //     )
    // } 

    return ( resourceTypeList.selected === undefined ) 
        ? <div>Loading details ...</div> 
    
    : (
		<>
            {/* {renderForm()} */}

            <FormComponent formConfig={appConfigData.data.registrationForm} formData={patientData.details} />
		</>
	);

}

const mapStateToProps = (state: AppState) => {
    return {
        statusData: state.statusData,
		resourceTypeList: state.resourceTypeList,
		appConfigData: state.appConfigData
    };
};

export default connect(mapStateToProps, null)(PatientDetails);
