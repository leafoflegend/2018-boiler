import { ReactNode } from 'react';
import { Action, ActionCreator } from 'redux';
import { ModalClass } from '../../src/react/design-system/Modal';
import { State, SpecificAction } from '../../@types/redux-types';

export interface State {
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
  DRAWER: object;
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
  router?: {
    action: string;
    location: {
      hash: string;
      pathname: string;
      search: string;
      state: any;
    };
  };
}

export const enum Constants {
  APP_BAR_TOGGLE_MENU = '@@appBar/TOGGLE_MENU',
  APP_BAR_TOGGLE_USER_MENU = '@@appBar/TOGGLE_USER_MENU',
  MODAL_OPEN = '@@modal/OPEN_MODAL',
  MODAL_CLOSE = '@@modal/CLOSE_MODAL',
  MODAL_LOAD_CHUNK = '@@modal/LOAD_CHUNK',
  OPEN_CHUNKED_MODAL = '@@modal/OPEN_CHUNKED_MODAL',
}

export type ConstantDictionary = { [typeName in Constants]: Constants };

export interface SpecificAction extends Action<Constants> {
  data?: any;
}
