import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dispatch, ActionCreator } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { connect } from 'react-redux';
import { Theme } from '@material-ui/core';
import classNames from 'classnames';
import { toggleAppBarMenu, toggleAppBarUserMenu } from '../../../redux/action-creators';
import { State, SpecificAction } from '../../../@types/redux-types';

interface StateProps {
  open: boolean;
  title: string | undefined;
  userAnchor: HTMLElement | undefined;
  userOpen: boolean;
  userMenuItems: { title: string; dispatchCb: ActionCreator<SpecificAction> }[];
}

interface DispatchProps {
  toggleMenu: (isOpen: boolean) => void;
  toggleUserMenu: (data: { open: boolean; node: HTMLElement | null }) => void;
  dispatch: Dispatch;
}

type Props = StateProps & DispatchProps;

const drawerWidth: number = 240;

const styles = (theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: '20px',
      flexGrow: 0,
    },
    userMenuButton: {
      flexGrow: 0,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    toolbarFlex: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    hide: {
      display: 'none',
    },
  });

class ApplicationBar extends Component<Props & WithStyles<typeof styles>> {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([undefined])]).isRequired,
    userAnchor: PropTypes.oneOfType([PropTypes.element, PropTypes.oneOf([undefined])]).isRequired,
    userOpen: PropTypes.bool.isRequired,
    userMenuItems: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        dispatchCb: PropTypes.func.isRequired,
      }),
    ).isRequired,
    toggleMenu: PropTypes.func.isRequired,
    toggleUserMenu: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  get UserMenu() {
    const {
      toggleUserMenu,
      userAnchor,
      userOpen,
      userMenuItems,
      dispatch,
      open,
      classes,
    } = this.props;

    if (userMenuItems && userMenuItems.length) {
      return (
        <div className={classNames(classes.userMenuButton)}>
          <IconButton
            aria-owns={open ? 'user-menu-appbar' : undefined}
            aria-haspopup="true"
            color="inherit"
            onClick={({ currentTarget }) => {
              toggleUserMenu({ open: true, node: currentTarget });
            }}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="user-menu-appbar"
            anchorEl={userAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={userOpen}
            onClose={() => {
              toggleUserMenu({ open: false, node: null });
            }}
          >
            {userMenuItems.map(({ title, dispatchCb }) => (
              <MenuItem
                key={title}
                onClick={() => {
                  toggleUserMenu({ open: false, node: null });
                  dispatch(dispatchCb(dispatch));
                }}
              >
                {title}
              </MenuItem>
            ))}
          </Menu>
        </div>
      );
    }

    return null;
  }

  public render() {
    const { open, title, toggleMenu, classes } = this.props;

    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbarFlex}>
          <IconButton
            color="inherit"
            onClick={() => {
              toggleMenu(open);
            }}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" className={classes.title}>
            {title}
          </Typography>
          {this.UserMenu}
        </Toolbar>
      </AppBar>
    );
  }
}

const decorateApplicationBar = withStyles(styles);

const StyledApplicationBar = decorateApplicationBar<Props>(ApplicationBar);

type MapStateToProps = (state: State) => StateProps;

const mapStateToProps: MapStateToProps = ({
  APP_BAR: {
    menu: { open },
    title,
    userMenu,
  },
}) => ({
  open,
  title,
  userAnchor: userMenu.anchorEl,
  userOpen: userMenu.open,
  userMenuItems: userMenu.menuItems,
});

type MapDispatchToProps = (dispatch: Dispatch) => DispatchProps;

const mapDispatchToProps: MapDispatchToProps = dispatch => ({
  dispatch,
  toggleMenu: (isOpen: boolean) => {
    dispatch(toggleAppBarMenu(!isOpen));
  },
  toggleUserMenu: ({ open, node = null }: { open: boolean; node: HTMLElement | null }) => {
    dispatch(toggleAppBarUserMenu({ node, open }));
  },
});

const ConnectedApplicationBar = connect<StateProps, DispatchProps, void, State>(
  mapStateToProps,
  mapDispatchToProps,
)(StyledApplicationBar);

export default ConnectedApplicationBar;
