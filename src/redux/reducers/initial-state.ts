import { State } from '../../../@types/redux-types';
import { openModal } from '../action-creators';

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
  DRAWER: {},
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
