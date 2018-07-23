import { ActionCreator, Dispatch } from 'redux';
import { Constants, SpecificAction } from '../../../../@types/redux-types';

const modalOpen: ActionCreator<SpecificAction> = ({
  type,
  dispatch,
}: {
  type: string;
  dispatch: Dispatch;
}): SpecificAction => ({
  type: Constants.MODAL_OPEN,
  data: { type, dispatch },
});

export default modalOpen;
