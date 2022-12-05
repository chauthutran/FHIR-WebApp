import React, { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent

import { connect } from "react-redux";
import * as ReduxVarType from "./types";
import PatientListComponent from './components/Patient.component';
import SearchAppConfigComponent from './components/SearchAppConfig.component';
import { AppState } from './redux/store';

type AppType = {
	statusData: ReduxVarType.StatusDataType,
	appConfigData: ReduxVarType.AppConfigType,
	resourceTypeList: any,
};

const App: FunctionComponent<AppType> = ({statusData, appConfigData, resourceTypeList}) => {

	useEffect(() => {
        
	}, [statusData]);

    
    return (
		<>
        	{!appConfigData.loaded && <SearchAppConfigComponent />}
			{appConfigData.loaded && <PatientListComponent />}
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
