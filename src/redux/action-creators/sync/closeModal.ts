import { Constants, SpecificCreator } from '../../../@types/redux-types';

const closeModal: SpecificCreator<Constants.MODAL_CLOSE> = () => ({
  type: Constants.MODAL_CLOSE,
  data: null,
});

export default closeModal;
