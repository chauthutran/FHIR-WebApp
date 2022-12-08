import React, { FunctionComponent, useEffect, useState } from 'react'; // importing FunctionComponent
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
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
import SyncIcon from '@mui/icons-material/Sync';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { connect } from "react-redux";
import * as ReduxVarType from "../../types";
import { AppState } from '../../redux/store';
import { fetchResourceTypeList, removeSelectedResourceType } from '../../redux';
import * as Constant from "../../constants";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


type SubAppBarType = {
    statusData: ReduxVarType.StatusDataType,
	appConfigData: ReduxVarType.AppConfigType,
    removeSelectedResourceType: typeof removeSelectedResourceType
};

const SubAppBar: FunctionComponent<SubAppBarType> = ({ appConfigData, removeSelectedResourceType }) => {
	
    const handleBackButtonOnClick = (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        event.preventDefault();
        removeSelectedResourceType();
    };

    return (
        <AppBar position="static" style={{backgroundColor: "#0D47A1"}} >
            <Toolbar>
                {/* Icon for menu which is showed on the left side */}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={(event) => handleBackButtonOnClick(event)}
                >
                    <ArrowBackIcon />
                </IconButton>
                {/* ==================== */}


                {/* App Title */}
                <Typography component="div" sx={{ flexGrow: 1 }}>Details</Typography>
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
	);

}

const mapStateToProps = (state: AppState) => {
    return {
        statusData: state.statusData,
		appConfigData: state.appConfigData
    };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
        removeSelectedResourceType: () => dispatch(removeSelectedResourceType())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubAppBar);
