import {ComponentClass} from 'react';
import {Dispatch} from 'redux';
import {State, ThunkFunc} from '../../../../@types/redux-types';
import {ModalClass} from '../../../react/design-system/Modal';
import {loadModalChunk, modalOpen} from '../sync';

const openModal: ThunkFunc = (type: string) => async (dispatch: Dispatch, getState) => {
  const currentState: State = getState();

  const {
    MODAL: {
      splitChunks: {main},
    },
  } = currentState;

  if (!main) {
    let Modal: {default: ModalClass};

    try {
      Modal = await import('../../../react/design-system/Modal');
    } catch (e) {
      console.error('Unable to dynamically import modal.', e.stack);

      // TODO: Or should I be graceful and not throw an error, and instead just not load the modal?
      throw new Error('Dynamic Import Failed.');
    }

    dispatch(loadModalChunk(Modal.default));
  }

  // TODO: Should I first check this type against a list of types that are configured?
  dispatch(modalOpen({type, dispatch}));
};

export default openModal;
