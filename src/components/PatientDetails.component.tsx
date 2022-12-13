import { FunctionComponent } from 'react'; 
import { connect } from "react-redux";
import { AppState } from '../redux/store';
import * as Utils from "../utils";
import * as Types from "../types";
import FormComponent from './Form.component';


type PatientDetailsType = {
	statusData: Types.StatusDataType,
	resourceTypeList: any,
	appConfigData: Types.AppConfigType
};

const PatientDetails: FunctionComponent<PatientDetailsType> = ({statusData, resourceTypeList, appConfigData}) => {

    const patientData: Types.PatientDetailsType = Utils.getPatientDetailsInfo( resourceTypeList.selected );
console.log(patientData);

    return ( resourceTypeList.selected === undefined ) 
        ? <div>Loading details ...</div> 
    
    : (
		<>
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
