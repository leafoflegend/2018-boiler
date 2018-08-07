import { effects } from 'redux-saga';
import { push } from 'connected-react-router';
import { SpecificAction } from '../../../@types/redux-types';
import { RoutePaths, NavTypes } from '../../../@types/router-types';

const { put } = effects;

export function* navDrawerActionHandler({ data }: SpecificAction): IterableIterator<any> {
  const {
    type,
    where,
  }: {
    type: NavTypes;
    where?: RoutePaths;
  } = data;

  if (type === NavTypes.ROUTE && !!where) {
    switch (where) {
      case RoutePaths.HOME:
        yield put(push('/'));
        break;
      case RoutePaths.SETTINGS:
        yield put(push('/settings'));
        break;
      default:
        // TODO: Need better behavior here.
        console.warn('Route path not recognized.');
    }
  }
}
