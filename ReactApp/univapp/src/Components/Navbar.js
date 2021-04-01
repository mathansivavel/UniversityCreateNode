
import { AppBar, IconButton, makeStyles, fade, InputBase, Toolbar, Typography, Button, 
    Popper, Grow, Hidden, Drawer,Avatar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';
import Dropdown from './Dropdown';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appbar: {
        background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);"
    },
    grow: {
        flexGrow: 1
    },
    btnSpacing: {
        "& > *": {
            margin: theme.spacing(1),
        }
    },
    title: {
        //   flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    contents: {
        margin: "120px"
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    rounded:{
        backgroundColor: "#3f51b5",
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginLeft: '7px',
        fontSize:'16px',
        fontWeight:600
    }
}));

function Navbar(props) {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = React.useState(false);


    const handleDrawerOpen = () => {
        setDrawerOpen(true);
    };

    console.log("draw", drawerOpen);

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };



    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleFilterClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        console.log("Inside Navbar");
        console.log("");
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const countFilter = props.selectedData.length;

    return (
        <div>
            <AppBar position="fixed" classes={{ colorPrimary: classes.appbar }}>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            onClick={handleDrawerOpen}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Typography className={classes.title} variant="h6" noWrap>
                        University
           </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={props.handleSearchQueryChanges}
                        />
                    </div>
                    <Button style={{ margin: "0px 15px" }} variant="contained" color="secondary"
                        onClick={props.handleSearch} >
                        Search
          </Button>
                    <Button
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        variant="contained"
                        color="primary"
                    >
                        Filter
         </Button> <Avatar  className={classes.rounded}>
         {countFilter}
</Avatar>
                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >


                                <Dropdown open={open}
                                    handleListKeyDown={handleListKeyDown}
                                    data={props.data} selectedData={props.selectedData}
                                    onCountryChange={props.onCountryChange}
                                    handleFilterClose={handleFilterClose} />

                            </Grow>
                        )}
                    </Popper>
                    <div className={classes.grow}></div>
                    <Hidden smDown>
                        <div className={classes.btnSpacing}>
                            <Button variant="contained" onClick={props.showAddModal}>
                                Add
         </Button>
                            <Button variant="contained" onClick={props.showEditModal}>
                                Edit
          </Button>
                            <Button variant="contained" onClick={props.showDeleteModal} >
                                Delete
         </Button>
                        </div>
                    </Hidden>
                </Toolbar>
            </AppBar>
           
            <Drawer
                className={classes.drawer}
                variant="temporary"
                anchor="left"
                open={drawerOpen}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onBackdropClick={handleDrawerClose}
            >
                <div style={{ padding: "5px" }}>

                    <Button style={{ display: "block", margin: "10px", width: "90%" }} color="primary" variant="contained" onClick={props.showAddModal}>
                        Add
         </Button>
                    <Button style={{ display: "block", margin: "10px", width: "90%" }} color="primary" variant="contained" onClick={props.showEditModal}>
                        Edit
          </Button>
                    <Button style={{ display: "block", margin: "10px", width: "90%" }} color="primary" variant="contained" onClick={props.showDeleteModal} >
                        Delete
         </Button>

                </div>
            </Drawer>
        </div>
    );
}


export default Navbar;