import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { State } from '../../../../@types/redux-types';
import { Dispatch } from 'redux';
import { toggleAppBarMenu } from '../../../redux/action-creators';

interface StateProps {
  open: boolean;
}

interface DispatchProps {
  drawerToggle: () => void;
}

type Props = StateProps & DispatchProps;

const drawerWidth: number = 240;

const styles = (theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 12px',
      ...theme.mixins.toolbar,
    },
  });

class ApplicationDrawer extends Component<Props & WithStyles<typeof styles>> {
  public render() {
    const { classes, open, drawerToggle } = this.props;

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={drawerToggle}>
            {!open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

const decorateApplicationDrawer = withStyles(styles);

const StyledApplicationDrawer = decorateApplicationDrawer<Props>(ApplicationDrawer);

type MapStateToProps = (state: State) => StateProps;

const mapStateToProps: MapStateToProps = ({
  APP_BAR: {
    menu: { open },
  },
}) => ({
  open,
});

type MapDispatchToProps = (dispatch: Dispatch) => DispatchProps;

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  drawerToggle: () => {
    dispatch(toggleAppBarMenu());
  },
});

const ConnectedStyledApplicationDrawer = connect<StateProps, DispatchProps, void, State>(
  mapStateToProps,
  mapDispatchToProps,
)(StyledApplicationDrawer);

export type DrawerClass = typeof ConnectedStyledApplicationDrawer;

export default ConnectedStyledApplicationDrawer;
