import PlainObject from './PlainObject';

type ServerResponse = PlainObject & {
  status: number;
  response?: string;
  reason?: string;
};

export default ServerResponse;
