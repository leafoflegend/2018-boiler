export interface State {
	APP_BAR: {
		title: string;
		menu: {
			open: boolean;
		};
	};
	DRAWER: object;
	MODAL: object;
	router?: {
		action: string;
		location: {
			hash: string;
			pathname: string;
			search: string;
			state: any;
		}
	};
}

export const enum Constants {
	APP_BAR_TOGGLE_MENU = '@@appBar/TOGGLE_MENU',
}

export type Action = { type: Constants, data?: any };

export type ActionCreator = (data?: any) => Action;

export type Dispatch = (action: Action) => void;

export type MapStateToProps<R, P = {}> = (currentState: State, ownProps?: P) => R;

export type MapDispatchToProps<R, P = {}> = (dispatch: Dispatch, ownProps?: P) => R;

export type Reducer = (state: State, action: Action) => State;

export type ConstantDictionary = {
	[typeName in Constants]: Constants;
};
