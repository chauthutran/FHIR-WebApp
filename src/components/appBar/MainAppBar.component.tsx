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
import { fetchResourceTypeList } from '../../redux';
import * as Constant from "../../constants";

type MainAppBarType = {
    statusData: ReduxVarType.StatusDataType,
	appConfigData: ReduxVarType.AppConfigType,
    fetchResourceTypeList: typeof fetchResourceTypeList
};

const MainAppBar: FunctionComponent<MainAppBarType> = ({statusData, appConfigData, fetchResourceTypeList}) => {
	
    const [showMenu, setShowMenu] = useState(false);

    const logOutIcon = require("../../images/logout.svg").default;


    const handleItemOnClick = (
        event: React.KeyboardEvent | React.MouseEvent,
        pathName: string,
    ) => {
        fetchResourceTypeList( pathName, Constant.QUERY_ORGUNIT_FILTER_KEY, appConfigData.data.orgUnit.id );
        setShowMenu(false);
    };


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
                {/* Menu header */}
                <ListItem key="appTitle" disablePadding>
                    <ListItemButton style={{backgroundColor: "#90CAF9"}}>
                        <ListItemIcon>
                            <div className="navigation__logo"></div>
                        </ListItemIcon>
                        <ListItemText primary={appConfigData.data.orgUnit.name} />
                    </ListItemButton>
                </ListItem> 


                {/* Menu item */}
                {appConfigData.data.config.menus.map((item: any, index: any) => {
                    
                    let iconClazz = `navigation__items-icon ${item.iconClass}`;
                    return ( item.label == "-") ? <Divider key={index} /> : (
                        <ListItem key={item.id} disablePadding 
                            onClick={(event: React.KeyboardEvent | React.MouseEvent) => handleItemOnClick(event, item.pathName)} 
                            onKeyDown={(event: React.KeyboardEvent | React.MouseEvent) => handleItemOnClick(event, item.pathName)} 
                        >
                            <ListItemButton>
                                <ListItemIcon>
                                    <div className={iconClazz} ></div>
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}

                <Divider key="logout_key"/> 
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


                {/* Menu container */}
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
        statusData: state.statusData,
		appConfigData: state.appConfigData
    };
};

const mapDispatchToProps = (dispatch: any) => {
	return {
		fetchResourceTypeList: (resourceType: string, searchBy: string, searchValue: string) => dispatch(fetchResourceTypeList(resourceType, searchBy, searchValue))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainAppBar);
