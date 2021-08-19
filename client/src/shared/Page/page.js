//React 
import React, { useState } from 'react';
import classnames from 'classnames';

//Development Stage Imports
import Photo from './Photo.jpg';

//Material UI 
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

//Material UI Icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import BusinessIcon from '@material-ui/icons/Business';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import StorageIcon from '@material-ui/icons/Storage';

//SCSS Styles
import style from './Page.module.scss';

const useStyles = makeStyles(theme => ({
    paper: {
        background: "#2B6684",
    },
    avatar: {
        height: 70,
        width: 70,
        margin: "30px auto 10px auto",
    },
    userInfo: {
        color: "white",
        fontSize: 13,
        paddingBottom: 15,
        textAlign: "center",
    },
    name: {
        letterSpacing: 1,
    },
    email: {
        fontSize: 12,
    },
    list: {
        border: 0,
        color: "white",
        narginTop: 10,
        width: 300,
    },
    listItem: {
        borderRadius: "18px",
        fontSize: 16,
        margin: "15px 10px",
        width: 280,

        '&:hover': {
            background: "#7DADC6",
            fontSize: 17,
            transitionDuration: "0.3s",
        },
    },
    listIcon: {
        marginRight: "15px"
    }

}));

export default function Page(props) {

    const classes = useStyles();
    const [state, setState] = useState();

    //Toggle Drawer Function
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState(open);
    };

    //Drawer List Items
    const list = () => (
        <div onClick={toggleDrawer(false)} className={classes.list}>
            <List>
                <ListItem
                    className={classes.listItem}
                    button>
                    <PeopleIcon className={classes.listIcon} />
                    Employees
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <PersonIcon className={classes.listIcon} />
                    Customers
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <BusinessIcon className={classes.listIcon} />
                    Suppliers
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <AssignmentIcon className={classes.listIcon} />
                    Orders
                </ListItem>
                <ListItem
                    className={classes.listItem}
                    button>
                    <StorageIcon className={classes.listIcon} />
                    Products
                </ListItem>
            </List>
        </div>
    );

    return (
        <div className={style.container}>
            <Drawer
                anchor={'left'}
                classes={{ paper: classes.paper }}
                onClose={toggleDrawer(false)}
                open={state}
            >
                <div className={classes.userInfo}>
                    <Avatar alt="Khione" className={classes.avatar} src={Photo} />
                    <div className={classes.name}>Shakya Karunathilake</div>
                    <div className={classes.email}>karunathilakeshakya@gmail.com</div>
                </div>
                {list()}
            </Drawer>
            <div className={style.pageHeader}>
                <div className={style.iconDiv}>
                    <MenuIcon
                        className={style.icon}
                        onClick={toggleDrawer(true)}
                    />
                </div>
                <div className={style.title}>
                    {props.title}
                </div>
                <div className={style.iconDiv}>
                    <PowerSettingsNewIcon
                        className={classnames(style.icon, style.redIcon)}
                    />
                </div>
            </div>
            <div className="pageContent">
                {props.children}
            </div>
        </div>
    );
}
