import React, { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { fetchResourceTypeList } from '../redux';
import { connect } from "react-redux";
import * as ReduxVarType from "../varTypes";
import * as Constant from "../constants";
import { AppState } from '../redux/store';
import { Dispatch } from "redux";

type PatientListType = {
	statusData: ReduxVarType.StatusDataType,
	resourceTypeList: any,
	appConfigData: ReduxVarType.AppConfigType,
	fetchResourceTypeList: typeof fetchResourceTypeList
};

const PatientList: FunctionComponent<PatientListType> = ({statusData, resourceTypeList, appConfigData, fetchResourceTypeList}) => {

    
	const [refresh, setRefresh] = useState(1);
	

    useEffect(() => {
        console.log(" === appConfigData.loaded : useEffect ");
        if( appConfigData.loaded && resourceTypeList.Patient === undefined )
		{
            fetchResourceTypeList("Patient", Constant.QUERY_ORGUNIT_FILTER_KEY, Constant.QUERY_ORGUNIT_FILTER_ID);
        }
	}, [appConfigData.loaded]);

    // useEffect(() => {
    //     console.log("=== PatientList statusData useEffect ");
    //     console.log(statusData);
    //     // console.log(resourceTypeList);
    //     // console.log("============================= ");
    //     setRefresh(refresh + 1);
        
        
        
    //     // if( resourceTypeList.Patient !== undefined )
	// 	// {
    //     //     console.log("===== PatientList : appConfigData.loaded " + appConfigData.loaded + " --- resourceTypeList.Patient + " + resourceTypeList.Patient );
    //     // }
	// }, [statusData]);

   


	// useEffect(() => {
    //     if( appConfigData.loaded && resourceTypeList.Patient === undefined )
	// 	{
    //         fetchResourceTypeList("Patient", Constant.QUERY_ORGUNIT_FILTER_KEY, Constant.QUERY_ORGUNIT_FILTER_ID);
    //     }
	// }, [])
    
    // console.log("=====PatientList Component");
    // console.log(statusData);
    // // console.log(resourceTypeList);
    // // console.log("==========================================");


	return ( resourceTypeList.Patient === undefined ) 
        ? <div>Loading {refresh}</div> 
    
    : (
		<div>
			<div>Client List {refresh}</div>
			<div>
                {resourceTypeList.Patient && <List key="Patient">
                   
                    {resourceTypeList.Patient.map((data: any, index: any) => {
                        let name = data.resource.name[0];
                        let fullName = ( name.given ) ? name.given[0] : "";
                        fullName += " " + name.family;
                        let birthDate = data.resource.birthDate;
                        let gender = data.resource.gender;
                        return (
                            <ListItem key={data.resource.id} >
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText primary={fullName} secondary={birthDate + ", " + gender}/>
                            </ListItem>
                            );
                        }
                    )}

                </List>}
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

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchResourceTypeList: (resourceType: string, searchBy: string, searchValue: string) => dispatch(fetchResourceTypeList(resourceType, searchBy, searchValue))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
