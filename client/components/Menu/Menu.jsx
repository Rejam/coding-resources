import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Divider, Drawer, AppBar, Button, Toolbar, CssBaseline, List, Typography, IconButton, Hidden, ListItem, ListItemText } from '@material-ui/core';
import { Menu } from '@material-ui/icons';

import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';


import Intro from '../Intro/Intro';
import IndividualLink from '../IndividualLink/IndividualLink';
import LinkListPage from '../LinkListPage/LinkListPage';

const drawerWidth = 240;

const styles = theme => ({
  root: { display: 'flex' },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: { width: `calc(100% - ${drawerWidth}px)` },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: { display: 'none' },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: { width: drawerWidth },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    textAlign: 'center',
  },
  grow: { 
    flexGrow: 1, 
  },
  languagebar: { 
    textAlign: 'center',
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
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});


// Notes
// possibly relocate the login/sign in button or search button

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mobileOpen: false };
  }

  handleDrawerToggle() {
    const { mobileOpen } = this.state;

    this.setState({ mobileOpen: !mobileOpen });
  }

  render() {
    const { classes, theme, container } = this.props;
    const { mobileOpen } = this.state;

    const drawer = (
      <div>
        <div className={classes.toolbar} /> 

        {/* Could add title or search input here?? */}
        <div className={classes.grow} />
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
              />
            </div>

        <Divider />
        <List className={classes.languagebar}>
          {['JavaScript', 'Python', 'Ruby', 'Swift', 'Java', 'C#', 'SQL', 'PHP', 'C++', 'HTML/CSS'].map(text => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Forum', 'Creators', 'Contact', 'Setting'].map(text => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
{/* AppBar */}

        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow} noWrap>
              Programming Reference Site
            </Typography>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Sign up</Button>


{/* Search Button */}
            {/* <div className={classes.grow} />
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
              />
            </div> */}
          </Toolbar>
        </AppBar>
        
{/* Programming languages */}

        <nav className={classes.drawer}>
          {/* The implementation can be swap with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{ paper: classes.drawerPaper }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
{/* Main */}
{/* Add components here */}

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Intro />
          {/* <IndividualLink /> */}
          {/* <LinkListPage /> */}
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  container: PropTypes.shape({}),
  theme: PropTypes.shape({}).isRequired,
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
