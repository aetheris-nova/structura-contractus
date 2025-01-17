// enums
import { ErrorCodeEnum } from '@client/enums';

// errors
import BaseError from '@client/errors/BaseError';

export default class WorldDataNotFoundError extends BaseError {
  constructor(message?: string) {
    super({
      code: ErrorCodeEnum.WorldDataNotFoundError,
      message,
      reference: 'WorldDataNotFoundError',
    });
  }
}
