import { State } from '../../@types/redux-types';
import { RoutePaths, NavTypes } from '../../@types/router-types';
import { openModal, navDrawerAction } from '../action-creators';

const initialState: State = {
  APP_BAR: {
    userMenu: {
      open: false,
      anchorEl: undefined,
      menuItems: [
        {
          title: 'Login',
          dispatchCb: dispatch => openModal({ dispatch, type: 'login' }),
        },
      ],
    },
    menu: {
      open: false,
    },
    title: process.env.APPLICATION_NAME,
  },
  DRAWER: {
    navItems: [
      {
        title: 'Home',
        icon: 'home',
        dispatchCb: dispatch =>
          navDrawerAction({ dispatch, type: NavTypes.ROUTE, where: RoutePaths.HOME }),
      },
      {
        title: 'Settings',
        icon: 'settings',
        dispatchCb: dispatch =>
          navDrawerAction({ dispatch, type: NavTypes.ROUTE, where: RoutePaths.SETTINGS }),
      },
    ],
  },
  MODAL: {
    title: null,
    content: null,
    actions: null,
    type: null,
    open: false,
    splitChunks: {
      main: null,
    },
  },
};

export default initialState;
