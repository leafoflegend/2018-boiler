import {Reducer} from 'redux';
import {State, SpecificAction, Constants} from '../../../../@types/redux-types';
import {hydrateModal} from '../../../utils';

const modalReducer: Reducer = (state: State, {type, data}: SpecificAction): State => {
  switch (type) {
    case Constants.MODAL_LOAD_CHUNK:
      return {
        ...state,
        MODAL: {
          ...state.MODAL,
          splitChunks: {
            ...state.MODAL.splitChunks,
            main: data,
          },
        },
      };
    case Constants.MODAL_OPEN:
      return {
        ...state,
        MODAL: {
          ...state.MODAL,
          open: true,
          type: data.type,
          ...hydrateModal(data),
        },
      };
    case Constants.MODAL_CLOSE:
      return {
        ...state,
        MODAL: {
          ...state.MODAL,
          open: false,
          type: null,
        },
      };
    default:
      return state;
  }
};

export default modalReducer;
