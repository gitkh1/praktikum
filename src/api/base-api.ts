import ServerResponse from '../types/ServerResponse';
import { HOST_RESOURCES } from '../utils/HTTPTransport';

type processResponseType = [
  boolean,
  { [key: string]: unknown; reason?: string }
];

export default abstract class BaseAPI {
  create(data?: unknown) {
    throw new Error(`Not implemented, ${data}`);
  }

  read(data?: unknown) {
    throw new Error(`Not implemented, ${data}`);
  }

  update(data?: unknown) {
    throw new Error(`Not implemented, ${data}`);
  }

  delete(data?: unknown) {
    throw new Error(`Not implemented, ${data}`);
  }

  processResponse(response: ServerResponse): processResponseType {
    try {
      if (!response) {
        return [false, {}];
      }
      if (response.response === 'OK') {
        return [true, { reason: 'OK' }];
      }
      const answer = JSON.parse(
        response.response
          ?.replaceAll('null', '""')
          .replaceAll('"/', `"${HOST_RESOURCES}/`) || '{}'
      );
      return [response.status === 200, answer];
    } catch (e) {
      alert(e);
      return [false, {}];
    }
  }
}
