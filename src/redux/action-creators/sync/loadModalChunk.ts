import {ActionCreator} from 'redux';
import {Constants, SpecificAction} from '../../../../@types/redux-types';

const loadModalChunk: ActionCreator<SpecificAction> = (chunk: JSX.Element): SpecificAction => ({
  type: Constants.MODAL_LOAD_CHUNK,
  data: chunk,
});

export default loadModalChunk;
