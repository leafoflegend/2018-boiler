import { ConstantDictionary, Constants } from '../../@types/redux-types';

const reduxConstants: ConstantDictionary = {
  '@@appBar/TOGGLE_MENU': Constants.APP_BAR_TOGGLE_MENU,
  '@@appBar/TOGGLE_USER_MENU': Constants.APP_BAR_TOGGLE_USER_MENU,
  '@@modal/OPEN_MODAL': Constants.MODAL_OPEN,
  '@@modal/CLOSE_MODAL': Constants.MODAL_CLOSE,
  '@@modal/LOAD_CHUNK': Constants.MODAL_LOAD_CHUNK,
  '@@modal/OPEN_CHUNKED_MODAL': Constants.OPEN_CHUNKED_MODAL,
  '@@drawer/NAV_ACTION': Constants.NAV_DRAWER_ACTION,
  '@@login/UPDATE_USERNAME': Constants.UPDATE_USERNAME,
  '@@login/UPDATE_PASSWORD': Constants.UPDATE_PASSWORD,
};

export default reduxConstants;
