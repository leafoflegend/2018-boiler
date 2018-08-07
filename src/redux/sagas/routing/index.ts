import { effects } from 'redux-saga';
import { State, SpecificAction } from '../../../@types/redux-types';
import { Dispatch } from 'redux';

const { select, call, put } = effects;

export function* navDrawerActionHandler({ data }: SpecificAction): IterableIterator<any> {
  const {
    dispatch,
    type,
    where,
  }: {
    dispatch: Dispatch;
    type: string;
    where?: string;
  } = data;
}
