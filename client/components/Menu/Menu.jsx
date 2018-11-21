import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Divider, Drawer, AppBar, Button, Toolbar, CssBaseline, List, Typography, IconButton, Hidden, ListItem, ListItemText, InputBase } from '@material-ui/core';
import { Menu, Search as SearchIcon } from '@material-ui/icons';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { NavLink, Route, Switch, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import { Intro, Login, Register, NoMatch, LinkListPage, IndividualLink, SubmitLink } from '..';

import './Menu.scss';

const drawerWidth = 240;
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

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
  grow: { flexGrow: 1 },
  languagebar: { textAlign: 'center' },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': { backgroundColor: fade(theme.palette.common.white, 0.25) },
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
      '&:focus': { width: 200 },
    },
  },
});

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
          {['JavaScript', 'Python', 'Ruby', 'Swift', 'Java', 'C#', 'SQL', 'PHP', 'C++', 'HTML/CSS', 'Frameworks', 'General'].map(text => (
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
            <Button>
              <NavLink className="link" to="/login">Login</NavLink>
            </Button>
            <Button>
              <NavLink className="link" to="/sign-up">Sign up</NavLink>
            </Button>
            <Button>
              <NavLink className="link" to="/">Home</NavLink>
            </Button>
            <Button>
              <NavLink className="link" to="/link">Link</NavLink>
            </Button>
            <Button>
              <NavLink className="link" to="/link-list">Link List</NavLink>
            </Button>
            <Button>
              <NavLink className="link" to="/link-submit">Submit Link</NavLink>
            </Button>
            <Button>
              <NavLink className="link" to="/adasda">Error 404</NavLink>
            </Button>
          </Toolbar>
        </AppBar>
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
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Router history={createBrowserHistory()}>
            <Switch>
              <Route exact path="/" component={Intro} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/sign-up" component={Register} />
              <Route exact path="/link-list" component={LinkListPage} />
              <Route exact path="/link-submit" component={SubmitLink} />
              <Route exact path="/link" component={IndividualLink} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
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
