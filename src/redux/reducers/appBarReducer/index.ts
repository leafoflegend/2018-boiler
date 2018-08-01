import { Reducer } from 'redux';
import { State, Constants, SpecificAction } from '../../../../@types/redux-types';

const appBarReducer: Reducer = (state: State, { type, data }: SpecificAction): State => {
  switch (type) {
    case Constants.APP_BAR_TOGGLE_MENU:
      return {
        ...state,
        APP_BAR: {
          ...state.APP_BAR,
          menu: {
            ...state.APP_BAR.menu,
            open: data ? data : !state.APP_BAR.menu.open,
          },
        },
      };
    case Constants.APP_BAR_TOGGLE_USER_MENU:
      return {
        ...state,
        APP_BAR: {
          ...state.APP_BAR,
          userMenu: {
            ...state.APP_BAR.userMenu,
            open: data.open ? data.open : !state.APP_BAR.userMenu.open,
            anchorEl: data.node,
          },
        },
      };
    default:
      return state;
  }
};

export default appBarReducer;
