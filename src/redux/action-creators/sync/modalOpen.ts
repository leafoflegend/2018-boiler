import { Dispatch } from 'redux';
import { Constants, SpecificCreator } from '../../../@types/redux-types';

const modalOpen: SpecificCreator<Constants.MODAL_OPEN> = ({
  type,
  dispatch,
}: {
  type: string;
  dispatch: Dispatch;
}) => ({
  type: Constants.MODAL_OPEN,
  data: { type, dispatch },
});

export type ModalOpen = typeof modalOpen;

export default modalOpen;
