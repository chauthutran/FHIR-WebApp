import React, { FunctionComponent, useEffect, useState } from 'react'; 
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import * as Constant from "../constants";
import { AppState } from '../redux/store';
import * as Utils from "../utils";
import * as Types from "../types";

type PatientDetailsType = {
	statusData: ReduxVarType.StatusDataType,
	resourceTypeList: any,
	appConfigData: ReduxVarType.AppConfigType
};

const PatientDetails: FunctionComponent<PatientDetailsType> = ({statusData, resourceTypeList, appConfigData}) => {

    const renderPatientData = () => {
        const patientData: Types.PatientDetailsType = Utils.getPatientDetailsInfo( resourceTypeList.Patient.selected );

        console.log(patientData);
        return (
            <> 
                <div>
                    <p>- Full Name: {patientData.details.fullName}</p>
                    <p>- Birthdate: {patientData.details.birthDate}</p>
                    <p>- Gender: {patientData.details.gender}</p>
                </div>

                <div>Service Details</div>
                <div>
                    {renderService(patientData.services)}
                </div> 
            </>
        )

    };

    const renderService = (services: Types.PatientServiceType[]) => {
        let result = []; // Need to conver this one become $("<div></div>"), remenber to add JQuery libs
        for( let i=0; i<services.length; i++ )
        {
            const serviceData = services[i];
            let codeListTags = [];
            for( let j=0; j<serviceData.codes.length; j++ )
            {
                const data = serviceData.codes[j];
                const key = serviceData.id + "_" + data.code;
                codeListTags.push( <p key={key}>{data.display}: {data.code}</p> );
            }

            result.push(<div id={serviceData.id} key={serviceData.id}>{codeListTags}</div>);
        }

        return result;
    }


    return ( resourceTypeList.Patient.selected === undefined ) 
        ? <div>Loading client details ...</div> 
    
    : (
		<div>
			<div>Client Details </div>
			{renderPatientData()}
		</div>
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
