import { ActionCreator, Dispatch } from 'redux';
import { Constants, SpecificAction } from '../../../../@types/redux-types';

const openModal: ActionCreator<SpecificAction> = ({
  type,
  dispatch,
}: {
  type: string;
  dispatch: Dispatch;
}): SpecificAction => ({
  type: Constants.OPEN_CHUNKED_MODAL,
  data: { type, dispatch },
});

export default openModal;
