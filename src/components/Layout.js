import { makeStyles } from '@material-ui/core'
import React from 'react'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons'
import { useHistory, useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search';
import StorageIcon from '@material-ui/icons/Storage';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ShoppingCart from "../components/ShoppingCart"
// import Crawling from './components/Crawling'

import BugReportIcon from '@mui/icons-material/BugReport';

const drawerWidth = 240


const useStyles = makeStyles((theme) => {
    return{
        page: {
            //background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer:{
            width: drawerWidth
        },
        drawerPaper:{
            width: drawerWidth
        },
        root:{
            display: 'flex'
        },
        active: {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        subtitle: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
})

export default function Layout( { children }) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();

    const menuItems = [
        {
            text: 'Search',
            icon: <SearchIcon color="secondary"></SearchIcon>,
            path: '/search'
        },
        {
            text: 'Create',
            icon: <AddCircleOutlined color="secondary"/>,
            path: '/create'
        },
        {
            text: 'Products',
            icon: <StorageIcon color="secondary"></StorageIcon>,
            path: '/'
        },
        {
            text: "Orders",
            icon: <ShoppingCartIcon color="secondary"></ShoppingCartIcon>,
            path: '/orders'
        },
        // {
        //     text: "crawling Seach",
        //     icon: <BugReportIcon color="secondary"></BugReportIcon>,
        //     path: '/crawling'
        // }

    ]

    const handleClick = (e) => {
        console.log(`${e.target}`)
    }

    console.log(location.pathname)

    return (
        <div className={classes.root}>
            {/* app bar */}
            <AppBar 
                elevation={0}
                className={classes.appbar}
            >
                <ToolBar>
                    <Typography className={classes.subtitle} >
                        {location.pathname == '/' ? 'PRODUCT' : location.pathname.replace('/','').toUpperCase()}
                        
                    </Typography>

                    {location.pathname == '/create' || location.pathname == '/orders' || location.pathname == '/search' ? null : 
                    
                        // <IconButton onClick={handleClick}>
                        //     <Badge badgeContent={4} color="primary"><ShoppingCartIcon /></Badge>
                        // </IconButton>
                        <ShoppingCart />
                    
                    }
                    
                </ToolBar>
            </AppBar>
            {/* side drawer */}
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography variant="h5" className={classes.title}>
                        Functions
                    </Typography>
                </div>
                {/* list links */}
                <List>
                    {menuItems.map(item => (
                        <ListItem 
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname == item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text}></ListItemText>
                        </ListItem>
                        )
                    )}
                </List>
            </Drawer>
            
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>

            
        </div>
    )
}