import {ConstantDictionary, Constants} from '../../../@types/redux-types';

const reduxConstants: ConstantDictionary = {
  '@@appBar/TOGGLE_MENU': Constants.APP_BAR_TOGGLE_MENU,
  '@@appBar/TOGGLE_USER_MENU': Constants.APP_BAR_TOGGLE_USER_MENU,
  '@@modal/OPEN_MODAL': Constants.MODAL_OPEN,
  '@@modal/CLOSE_MODAL': Constants.MODAL_CLOSE,
  '@@modal/LOAD_CHUNK': Constants.MODAL_LOAD_CHUNK,
};

export default reduxConstants;
