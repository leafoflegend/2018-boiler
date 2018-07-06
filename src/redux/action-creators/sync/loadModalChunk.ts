import {
	Constants,
	Action,
	ActionCreator,
} from '../../../../@types/redux-types';

const loadModalChunk: ActionCreator = (chunk: JSX.Element): Action => ({
	type: Constants.MODAL_LOAD_CHUNK,
	data: chunk,
});

export default loadModalChunk;
