import {ActionCreator} from 'redux';
import {Constants, SpecificAction} from '../../../../@types/redux-types';

const closeModal: ActionCreator<SpecificAction> = (): SpecificAction => ({
  type: Constants.MODAL_LOAD_CHUNK,
  data: null,
});

export default closeModal;
