import React, { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent

import { connect } from "react-redux";
import * as ReduxVarType from "./varTypes";
import PatientListComponent from './components/Patient.component';
import SearchAppConfigComponent from './components/SearchAppConfig.component';
import { AppState } from './redux/store';

type AppType = {
	statusData: ReduxVarType.StatusDataType,
	appConfigData: ReduxVarType.AppConfigType,
	resourceTypeList: any,
};

const App: FunctionComponent<AppType> = ({statusData, appConfigData, resourceTypeList}) => {

	
	// const [refresh, setRefresh] = useState(1);

	useEffect(() => {
        console.log("=== App statusData useEffect ");
        console.log(statusData);
        // console.log(resourceTypeList);
        // console.log("============================= ");
        // setRefresh(refresh + 1);
        
        
        
        // if( resourceTypeList.Patient !== undefined )
		// {
        //     console.log("===== PatientList : appConfigData.loaded " + appConfigData.loaded + " --- resourceTypeList.Patient + " + resourceTypeList.Patient );
        // }
	}, [statusData]);

    
			/* { resourceTypeList.Patient && <PatientListComponent />} */
			console.log(resourceTypeList);
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
