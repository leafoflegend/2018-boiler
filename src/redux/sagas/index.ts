import { takeEvery } from 'redux-saga/effects';
import { openChunkModal } from './splitting';
import { Constants } from '../../../@types/redux-types';

function* rootSaga() {
  yield takeEvery(Constants.OPEN_CHUNKED_MODAL, openChunkModal);
}

export default rootSaga;
