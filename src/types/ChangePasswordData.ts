import Data from './Data';

type ChangePasswordData = Data & {
  oldPassword: string;
  newPassword: string;
};

export default ChangePasswordData;
