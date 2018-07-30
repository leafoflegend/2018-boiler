import { effects } from 'redux-saga';
import { openChunkModal } from './splitting';
import { Constants } from '../../../@types/redux-types';

const { takeEvery } = effects;

function* rootSaga() {
  yield takeEvery(Constants.OPEN_CHUNKED_MODAL, openChunkModal);
}

export default rootSaga;
