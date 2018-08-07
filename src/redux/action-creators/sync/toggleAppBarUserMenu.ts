import { Constants, SpecificCreator } from '../../../@types/redux-types';

const toggleAppBarUserMenu: SpecificCreator<Constants.APP_BAR_TOGGLE_USER_MENU> = ({
  open,
  node = null,
}: {
  open: boolean;
  node: Node | null;
}) => ({
  type: Constants.APP_BAR_TOGGLE_USER_MENU,
  data: {
    open,
    node,
  },
});

export type ToggleAppBarUserMenu = typeof toggleAppBarUserMenu;

export default toggleAppBarUserMenu;
