import { ReactNode } from 'react';
import { ActionCreator, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { ModalClass } from '../../src/react/design-system/Modal';
import { State } from '../../@types/redux-types';

export interface State {
	APP_BAR: {
		title: string | undefined;
		userMenu: {
			open: boolean;
			anchorEl: undefined | HTMLElement;
			menuItems: { title: string, dispatchCb: any }[];
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
}

export type ConstantDictionary = {
	[typeName in Constants]: Constants;
};

export interface SpecificAction extends Action<Constants> {
	data?: any;
}

export type ThunkResult<R> = ThunkAction<R, State, undefined, SpecificAction>;

export type ThunkFunc = (...data: any[]) => ThunkResult<void>;

export interface SpecificCreator extends SpecificAction {
	(...args: any[]): ThunkResult<void>;
	(...args: any[]): SpecificAction;
}
