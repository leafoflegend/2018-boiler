import {
	Constants,
	Action,
	ActionCreator,
} from '../../../../@types/redux-types';

const closeModal: ActionCreator = (): Action => ({
	type: Constants.MODAL_LOAD_CHUNK,
	data: null,
});

export default closeModal;
