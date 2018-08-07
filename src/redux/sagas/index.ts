import { effects } from 'redux-saga';
import { openChunkModal } from './splitting';
import { navDrawerActionHandler } from './routing';
import { Constants } from '../../@types/redux-types';

const { takeEvery } = effects;

function* rootSaga() {
  yield takeEvery(Constants.OPEN_CHUNKED_MODAL, openChunkModal);
  yield takeEvery(Constants.NAV_DRAWER_ACTION, navDrawerActionHandler);
}

export default rootSaga;
