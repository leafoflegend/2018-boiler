import { effects } from 'redux-saga';
import { State, SpecificAction } from '../../../@types/redux-types';
import { ModalClass } from '../../../react/design-system/Modal';
import { loadModalChunk, modalOpen } from '../../action-creators/sync';

const { select, call, put } = effects;

const selectChunk = (state: State): null | ModalClass => state.MODAL.splitChunks.main;

const importModal = async (): Promise<{ default: ModalClass }> => {
  try {
    return await import('../../../react/design-system/Modal');
  } catch (e) {
    throw new Error('Cannot import Modal component.');
  }
};

// TODO: IterableIterator<any> is non ideal. There is a large discussion around this in the typescript community as can be seen here: https://github.com/Microsoft/TypeScript/issues/2983
export function* openChunkModal({ data }: SpecificAction): IterableIterator<any> {
  let modalChunk: { default: ModalClass };

  try {
    modalChunk = yield select(selectChunk);

    if (!modalChunk) {
      try {
        modalChunk = yield call(importModal);

        yield put(loadModalChunk(modalChunk.default));
        yield put(modalOpen(data));
      } catch (e) {
        console.error('Unable to dynamically import modal.', e.stack);
      }
    } else {
      yield put(modalOpen(data));
    }
  } catch (e) {
    console.error('Unable to grab the chunk key from Modal slices of the store.', e.stack);
  }
}
