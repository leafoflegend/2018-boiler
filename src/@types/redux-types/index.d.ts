import { ReactNode } from 'react';
import { Action, ActionCreator, Dispatch } from 'redux';
import { ModalClass } from '../../react/design-system/Modal';
import { NavDrawerAction } from '../../redux/action-creators/sync/navDrawerAction';

export interface RawState {
  APP_BAR: {
    title: string | undefined;
    userMenu: {
      open: boolean;
      anchorEl: undefined | HTMLElement;
      // TODO: any for dispatchCb is no bueno
      menuItems: { title: string; dispatchCb: ActionCreator<SpecificAction> }[];
    };
    menu: {
      open: boolean;
    };
  };
  DRAWER: {
    navItems: {
      title: string;
      icon: string;
      dispatchCb: (dispatch: Dispatch) => ReturnType<NavDrawerAction>;
    }[];
  };
  MODAL: {
    type: null | string;
    title: string | ReactNode | null;
    content: string | ReactNode | null;
    actions: string | ReactNode | null;
    open: boolean;
    splitChunks: {
      main: null | ModalClass;
    };
  };
  LOGIN: {
    username: string;
    password: string;
  };
  router?: {
    action?: string;
    location?: {
      hash?: string;
      pathname?: string;
      search?: string;
      state?: any;
    };
  };
}

export type State = Readonly<RawState>;

export const enum Constants {
  APP_BAR_TOGGLE_MENU = '@@appBar/TOGGLE_MENU',
  APP_BAR_TOGGLE_USER_MENU = '@@appBar/TOGGLE_USER_MENU',
  MODAL_OPEN = '@@modal/OPEN_MODAL',
  MODAL_CLOSE = '@@modal/CLOSE_MODAL',
  MODAL_LOAD_CHUNK = '@@modal/LOAD_CHUNK',
  OPEN_CHUNKED_MODAL = '@@modal/OPEN_CHUNKED_MODAL',
  NAV_DRAWER_ACTION = '@@drawer/NAV_ACTION',
  UPDATE_USERNAME = '@@login/UPDATE_USERNAME',
  UPDATE_PASSWORD = '@@login/UPDATE_PASSWORD',
}

export type ConstantDictionary = { [typeName in Constants]: Constants };

export interface SpecificAction extends Action<Constants> {
  data?: any;
}

export type SpecificCreator<Constant extends Constants> = ActionCreator<Action<Constant>>;
