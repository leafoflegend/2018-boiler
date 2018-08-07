import { State } from '../../@types/redux-types';
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
        dispatchCb: dispatch => navDrawerAction({ dispatch, type: 'route', where: 'home' }),
      },
      {
        title: 'Settings',
        icon: 'settings',
        dispatchCb: dispatch => navDrawerAction({ dispatch, type: 'route', where: 'settings' }),
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
