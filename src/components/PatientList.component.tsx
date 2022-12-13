import React, { FunctionComponent, useEffect } from 'react'; // importing FunctionComponent
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { fetchResourceTypeList, fetchResourceTypeDetails } from '../redux';
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import * as Constant from "../constants";
import { AppState } from '../redux/store';
import * as Utils from "../utils";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MainAppBar from "./appBar/MainAppBar.component";


type PatientListType = {
	statusData: ReduxVarType.StatusDataType,
	resourceTypeList: any,
	appConfigData: ReduxVarType.AppConfigType,
	fetchResourceTypeList: typeof fetchResourceTypeList,
    fetchResourceTypeDetails: typeof fetchResourceTypeDetails,
};

const PatientList: FunctionComponent<PatientListType> = ({statusData, resourceTypeList, appConfigData, fetchResourceTypeList, fetchResourceTypeDetails}) => {
	
    useEffect(() => {
        if( appConfigData.loaded && resourceTypeList.Patient === undefined )
		{
            fetchResourceTypeList("Patient", Constant.QUERY_ORGUNIT_FILTER_KEY, Constant.QUERY_ORGUNIT_FILTER_ID);
        }
	}, [appConfigData.loaded]);

    
    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        id: string,
    ) => {
        fetchResourceTypeDetails("Patient", id );
    };
    
    const renderViewSelector = () => {
        return (
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                    // onChange={handleChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select> 
                </FormControl>
            </Box>
        )
    }

	return ( resourceTypeList.Patient === undefined ) 
        ? <div>Loading client list ...</div> 
    
    : (
		<>
            <MainAppBar />

            {renderViewSelector()}

			<div>
                {resourceTypeList.Patient && <List key="Patient">
                   
                    {resourceTypeList.Patient.map((data: any, index: any) => {
                        let details = Utils.getPatientItemInfo(data.resource);
                        const iconStr = details.fullName.substring(0,2).toUpperCase();
                        return (
                            <ListItem key={details.id} disablePadding>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: Utils.getColorFromStr(iconStr), width: 50, height: 50, marginRight: "10px"}} >{iconStr}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={details.fullName} secondary={details.birthDate + ", " + details.gender} onClick={(event: any) => handleListItemClick(event, details.id) } />
                                </ListItemButton>
                            </ListItem>
                            );
                        }
                    )}

                </List>}
            </div>

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

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchResourceTypeList: (resourceType: string, searchBy: string, searchValue: string) => dispatch(fetchResourceTypeList(resourceType, searchBy, searchValue)),
        fetchResourceTypeDetails: (resourceType: string, id: string) => dispatch(fetchResourceTypeDetails(resourceType, id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
