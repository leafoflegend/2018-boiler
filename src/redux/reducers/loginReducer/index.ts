import { Reducer } from 'redux';
import { State, SpecificAction, Constants } from '../../../@types/redux-types';

const loginReducer: Reducer = (state: State, { type, data }: SpecificAction): State => {
  switch (type) {
    case Constants.UPDATE_USERNAME:
      return {
        ...state,
        LOGIN: {
          ...state.LOGIN,
          username: data.username,
        },
      };
    case Constants.UPDATE_PASSWORD:
      return {
        ...state,
        LOGIN: {
          ...state.LOGIN,
          password: data.password,
        },
      };
    default:
      return state;
  }
};

export default loginReducer;
