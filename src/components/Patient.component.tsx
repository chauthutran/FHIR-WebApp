import React, { FunctionComponent, useEffect } from 'react'; // importing FunctionComponent
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
// import ImageIcon from '@mui/icons-material/Image';
import { Link } from "react-router-dom";

import { fetchResourceTypeList } from '../redux';
import { connect } from "react-redux";
import * as ReduxVarType from "../varTypes";
import * as Utils from "../utils";
import * as Constant from "../constants";


type PatientListType = {
	statusData: ReduxVarType.StatusDataType,
	resourceTypeList: any,
	fetchResourceTypeList: any
};

const PatientList: FunctionComponent<PatientListType> = ({statusData, resourceTypeList, fetchResourceTypeList}) => {

	useEffect(() => {
        if( !Utils.INIT_APP )
		{
            fetchResourceTypeList("Patient");
        }
	}, [])
    
    console.log("PatientList");
    console.log(statusData);
    console.log(resourceTypeList);
	return ( resourceTypeList.Patient === undefined ) 
        ? <div>Loading</div> 
    
    : (
		<div>
			<div>Client List</div>
			<div>
                <List key="Patient">
                   
                    {resourceTypeList.Patient.map((data: any, index: any) => {

                        let name = data.resource.name[0];
                        let fullName = name.given[0] + " " + name.family;
                        let birthDate = data.resource.birthDate;
                        let gender = data.resource.gender;
                        return (
                            // component={Link} to={"/patient/" + data.resource.id}
                            <ListItem key={data.resource.id} >
                                <ListItemAvatar>
                                {/* <Avatar>
                                    <ImageIcon />
                                </Avatar> */}
                                </ListItemAvatar>
                                <ListItemText primary={fullName} secondary={birthDate + ", " + gender}/>
                            </ListItem>
                            );
                        }
                    )}

                </List>
            </div>

    
		</div>
	);

}

const mapStateToProps = (state: any) => {
    return {
		resourceTypeList: state.resourceTypeList,
        statusData: state.statusData
    };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchResourceTypeList: (resourceType: string) => dispatch(fetchResourceTypeList(resourceType))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
