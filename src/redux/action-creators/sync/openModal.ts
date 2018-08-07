import { Dispatch } from 'redux';
import { Constants, SpecificCreator } from '../../../@types/redux-types';

const openModal: SpecificCreator<Constants.OPEN_CHUNKED_MODAL> = ({
  type,
  dispatch,
}: {
  type: string;
  dispatch: Dispatch;
}) => ({
  type: Constants.OPEN_CHUNKED_MODAL,
  data: { type, dispatch },
});

export type OpenModal = typeof openModal;

export default openModal;
