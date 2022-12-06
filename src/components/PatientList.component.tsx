import React, { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
import { fetchResourceTypeList, fetchResourceTypeDetails } from '../redux';
import { connect } from "react-redux";
import * as ReduxVarType from "../types";
import * as Constant from "../constants";
import { AppState } from '../redux/store';
import * as Utils from "../utils";
import SyncIcon from '@mui/icons-material/Sync';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type PatientListType = {
	statusData: ReduxVarType.StatusDataType,
	resourceTypeList: any,
	appConfigData: ReduxVarType.AppConfigType,
	fetchResourceTypeList: typeof fetchResourceTypeList,
    fetchResourceTypeDetails: typeof fetchResourceTypeDetails,
};

const PatientList: FunctionComponent<PatientListType> = ({statusData, resourceTypeList, appConfigData, fetchResourceTypeList, fetchResourceTypeDetails}) => {
	
    const [showMenu, setShowMenu] = useState(false);

    useEffect(() => {
        console.log(" === appConfigData.loaded : useEffect ");
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

    
  const toggleDrawer =
    ( open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
        console.log( "toggleDrawer : " + open );
        if ( event.type === 'keydown' &&  ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') ) {
            return;
        }

        setShowMenu(open);
    };
    
	const renderMenuList = () => {
        return <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            >
            <List>
                <ListItem key="clientList" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <div className="navigation__items-icon" style={{backgroundImage: "url(../images/menu_client_list.svg)" }}></div>
                        </ListItemIcon>
                        <ListItemText primary="Client List" />
                    </ListItemButton>
                </ListItem>

                <Divider />
                <ListItem key="recordList" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <div className="navigation__items-icon" style={{backgroundImage: "url(../images/menu_records_list.svg.svg)" }}></div>
                        </ListItemIcon>
                        <ListItemText primary="Record List" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="upcomingSchedules" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <div className="navigation__items-icon" style={{backgroundImage: "url(../images/menu_records_list.svg.svg)" }}></div>
                        </ListItemIcon>
                        <ListItemText primary="Upcoming Schedules" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
	}


	return ( resourceTypeList.Patient === undefined ) 
        ? <div>Loading client list ...</div> 
    
    : (
		<div>
            <AppBar position="static" style={{backgroundColor: "#0D47A1"}}>
                <Toolbar>
                    {/* Icon for menu which is showed on the left side */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* ==================== */}

                    {/* Menu item */}
                    <Drawer anchor="left" open={showMenu} onClose={toggleDrawer(false)} >
                        {renderMenuList()}
                    </Drawer>
                    {/* ==================== */}

                    {/* App Title */}
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        Client List
                    </Typography>
                    {/* ==================== */}


                    {/* The right icons */}
                    <div>
                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={}
                            color="inherit"
                        >
                            <SyncIcon />
                        </IconButton>

                        <IconButton
                            size="large"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={}
                            color="inherit"
                        >
                            <CloudUploadIcon />
                        </IconButton>
                    
                    </div>
                    {/* ==================== */}
                </Toolbar>
            </AppBar>

			<div>
                {resourceTypeList.Patient && <List key="Patient">
                   
                    {resourceTypeList.Patient.map((data: any, index: any) => {
                        let details = Utils.getPatientItemInfo(data.resource);
                        const iconStr = details.fullName.substring(0,2).toUpperCase();
                        return (
                            <ListItem key={details.id} disablePadding>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: Utils.getColorFromStr(iconStr) }} >{iconStr}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={details.fullName} secondary={details.birthDate + ", " + details.gender} onClick={(event: any) => handleListItemClick(event, details.id) } />
                                </ListItemButton>
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
		fetchResourceTypeList: (resourceType: string, searchBy: string, searchValue: string) => dispatch(fetchResourceTypeList(resourceType, searchBy, searchValue)),
        fetchResourceTypeDetails: (resourceType: string, id: string) => dispatch(fetchResourceTypeDetails(resourceType, id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
