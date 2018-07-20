import {ActionCreator} from 'redux';
import {Constants, SpecificAction} from '../../../../@types/redux-types';

const modalOpen: ActionCreator<SpecificAction> = (type: string): SpecificAction => ({
  type: Constants.MODAL_OPEN,
  data: type,
});

export default modalOpen;
