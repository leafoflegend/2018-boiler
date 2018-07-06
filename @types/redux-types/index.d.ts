import { ReactNode, ComponentClass } from 'react';

export interface State {
	APP_BAR: {
		title: string;
		userMenu: {
			open: boolean;
			anchorEl: null | HTMLElement;
			menuItems: { title: string, dispatchCb: ActionCreator | Thunk }[];
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
			main: null | ComponentClass;
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

export type Action = { type: Constants, data?: any };

export type ActionCreator = (data?: any) => Action;

export type Dispatch = (action: Action) => void;

export type DispatchThunk = (thunk: Thunk) => void;

export type MapStateToProps<R, P = {}> = (currentState: State, ownProps?: P) => R;

export type MapDispatchToProps<R, P = {}> = (dispatch: Dispatch | DispatchThunk, ownProps?: P) => R;

export type Reducer = (state: State, action: Action) => State;

type GetState = () => State;

export type ThunkReturn = (dispatch: Dispatch, getState: GetState) => Promise<void>;

export type Thunk = (...args: any[]) => ThunkReturn;

export type ConstantDictionary = {
	[typeName in Constants]: Constants;
};
