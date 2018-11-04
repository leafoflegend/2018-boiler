import { Constants, SpecificCreator } from '../../../@types/redux-types';

const updatePassword: SpecificCreator<Constants.UPDATE_PASSWORD> = ({
  password,
}: {
  password: string;
}) => ({
  type: Constants.UPDATE_PASSWORD,
  data: { password },
});

export type UpdatePassword = typeof updatePassword;

export default updatePassword;
