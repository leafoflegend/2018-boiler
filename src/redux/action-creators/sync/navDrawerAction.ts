import { Dispatch } from 'redux';
import { Constants, SpecificCreator } from '../../../@types/redux-types';
import { RoutePaths, NavTypes } from '../../../@types/router-types';

const navDrawerAction: SpecificCreator<Constants.NAV_DRAWER_ACTION> = (data: {
  dispatch: Dispatch;
  type: NavTypes;
  where?: RoutePaths;
}) => ({
  data,
  type: Constants.NAV_DRAWER_ACTION,
});

export type NavDrawerAction = typeof navDrawerAction;

export default navDrawerAction;
