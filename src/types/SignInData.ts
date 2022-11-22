import Data from './Data';

type SignInData = Data & {
  login: string;
  password: string;
};

export default SignInData;
