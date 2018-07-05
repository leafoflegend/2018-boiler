// TODO: This file should have a much more complex Tivo - that we can use to move back and then forward in time.

const Tivo = [];

const combineReducers = (state, reducers, action) => {
	if (Tivo.length === 0) {
		Tivo.push(state);
	}

	reducers.forEach((reducer) => {
		const nextReduction = reducer(Tivo[Tivo.length - 1], action, Tivo);

		Tivo.push(nextReduction);
	});

	return Tivo[Tivo.length - 1];
};

export default combineReducers;
