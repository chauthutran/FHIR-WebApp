import { FunctionComponent, useEffect } from 'react'; // importing FunctionComponent

import { connect } from "react-redux";
import * as Types from "./types";
import PatientListComponent from './components/PatientList.component';
import SearchAppConfigComponent from './components/Login.component';
import { AppState } from './redux/store';
import PatientDetailsComponent from './components/PatientDetails.component';

type AppType = {
	statusData: Types.StatusDataType,
	appConfigData: Types.AppConfigType,
	resourceTypeList: any,
};

const App: FunctionComponent<AppType> = ({statusData, appConfigData, resourceTypeList}) => {

	useEffect(() => {

	}, [statusData]);

    
    return (
		<>
        	{!appConfigData.loaded && <SearchAppConfigComponent />}

			{appConfigData.loaded && ( resourceTypeList.Patient === undefined || resourceTypeList.selected === undefined ) && <PatientListComponent />}

			{resourceTypeList.selected && <PatientDetailsComponent />}
		</>
	);

}

const mapStateToProps = (state: AppState) => {
    return {
		appConfigData: state.appConfigData,
		resourceTypeList: state.resourceTypeList,
        statusData: state.statusData
    };
};

export default connect(mapStateToProps, null)(App);
