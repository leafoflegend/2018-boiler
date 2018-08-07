import { Dispatch } from 'redux';
import { Constants, SpecificCreator } from '../../../@types/redux-types';

const enum NavTypes {
  ROUTE = 'route',
}

const navDrawerAction: SpecificCreator<Constants.NAV_DRAWER_ACTION> = (data: {
  dispatch: Dispatch;
  type: NavTypes;
  where?: string;
}) => ({
  data,
  type: Constants.NAV_DRAWER_ACTION,
});

export type NavDrawerAction = typeof navDrawerAction;

export default navDrawerAction;
