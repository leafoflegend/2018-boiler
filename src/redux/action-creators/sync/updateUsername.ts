import { Constants, SpecificCreator } from '../../../@types/redux-types';

const updateUsername: SpecificCreator<Constants.UPDATE_USERNAME> = ({
  username,
}: {
  username: string;
}) => ({
  type: Constants.UPDATE_USERNAME,
  data: { username },
});

export type UpdateUsername = typeof updateUsername;

export default updateUsername;
