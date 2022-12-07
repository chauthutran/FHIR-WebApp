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
// import clientListIcon from "../../images/menu_client_list.svg";
// import recordIcon from "../../images/menu_records_list.svg";
// import logOutIcon from "../../images/logout.svg";

type MainAppBarType = {
	appConfigData: ReduxVarType.AppConfigType
};

const MainAppBar: FunctionComponent<MainAppBarType> = ({appConfigData}) => {
	
    const [showMenu, setShowMenu] = useState(false);

    const clientListIcon = require("../../images/menu_client_list.svg").default;
    const recordIcon = require("../../images/menu_records_list.svg").default;
    const logOutIcon = require("../../images/logout.svg").default;

    const toggleDrawer =
        (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if ( event.type === 'keydown' &&  ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift') ) {
                return;
            }

            setShowMenu(open);
    };
    

    const renderMenuList = () => {
        return <Box>
            <List>
                <ListItem key="appTitle" disablePadding>
                    <ListItemButton style={{backgroundColor: "#90CAF9"}}>
                        <ListItemIcon>
                            <div className="navigation__logo"></div>
                        </ListItemIcon>
                        <ListItemText primary={appConfigData.data.orgUnit.name} />
                    </ListItemButton>
                </ListItem> 

                <ListItem key="clientList" disablePadding onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
                    <ListItemButton>
                        <ListItemIcon>
                            <div className="navigation__items-icon" style={{backgroundImage: `url(${clientListIcon})` }}></div>
                        </ListItemIcon>
                        <ListItemText primary="Client List" />
                    </ListItemButton>
                </ListItem>

                <Divider />
                <ListItem key="recordList" disablePadding onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)} >
                    <ListItemButton>
                        <ListItemIcon>
                            <div className="navigation__items-icon" style={{backgroundImage: `url(${recordIcon})` }}> </div>
                        </ListItemIcon>
                        <ListItemText primary="Record List" />
                    </ListItemButton>
                </ListItem>
                <ListItem key="upcomingSchedules" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <div className="navigation__items-icon" style={{backgroundImage: `url(${recordIcon})` }}></div>
                        </ListItemIcon>
                        <ListItemText primary="Upcoming Schedules" />
                    </ListItemButton>
                </ListItem>

                
                <Divider />
                <ListItem key="logout" disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <div className="navigation__items-icon" style={{backgroundImage: `url(${logOutIcon})` }}></div>
                        </ListItemIcon>
                        <ListItemText primary="Log out" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
	}

	return (
        <AppBar position="static" style={{backgroundColor: "#0D47A1"}} >
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
	);

}

const mapStateToProps = (state: AppState) => {
    return {
		appConfigData: state.appConfigData
    };
};

export default connect(mapStateToProps, null)(MainAppBar);
