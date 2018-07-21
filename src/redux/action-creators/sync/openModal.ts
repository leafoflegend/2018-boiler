import { ActionCreator } from 'redux';
import { Constants, SpecificAction } from '../../../../@types/redux-types';

const openModal: ActionCreator<SpecificAction> = (type: string): SpecificAction => ({
  type: Constants.OPEN_CHUNKED_MODAL,
  data: type,
});

export default openModal;
