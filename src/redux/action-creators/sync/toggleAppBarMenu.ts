import { Constants, SpecificCreator } from '../../../@types/redux-types';

const toggleAppBarMenu: SpecificCreator<Constants.APP_BAR_TOGGLE_MENU> = (open: boolean) => ({
  type: Constants.APP_BAR_TOGGLE_MENU,
  data: open,
});

export type ToggleAppBarMenu = typeof toggleAppBarMenu;

export default toggleAppBarMenu;
