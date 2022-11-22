import Data from './Data';

type SignUpData = Data & {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export default SignUpData;
