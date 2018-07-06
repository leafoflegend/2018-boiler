import {
	Reducer,
	State,
	Action,
} from '../../../../@types/redux-types';

// TODO: This file should have a much more complex Tivo - that we can use to move back and then forward in time.
const Tivo: State[] = [];

const combineReducers = (state: State, reducers: Reducer[], action: Action): State => {
	if (Tivo.length === 0) {
		Tivo.push(state);
	}

	reducers.forEach((reducer) => {
		const nextReduction = reducer(Tivo[Tivo.length - 1], action);

		Tivo.push(nextReduction);
	});

	return Tivo[Tivo.length - 1];
};

export default combineReducers;
