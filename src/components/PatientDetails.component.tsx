import React, { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import * as Constant from "../constants";
import { AppState } from '../redux/store';

type PatientDetailsType = {
	statusData: ReduxVarType.StatusDataType,
	resourceTypeList: any,
	appConfigData: ReduxVarType.AppConfigType
};

const PatientDetails: FunctionComponent<PatientDetailsType> = ({statusData, resourceTypeList, appConfigData}) => {
	
	return ( resourceTypeList.Patient.selected === undefined ) 
        ? <div>Loading client details ...</div> 
    
    : (
		<div>
			<div>Client Details</div>
			<div>
                {resourceTypeList.Patient.birthDate }
            </div>
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
