// enums
import { ErrorCodeEnum } from '@client/enums';

// errors
import BaseError from '@client/errors/BaseError';

export default class NoAccountConnectedError extends BaseError {
  constructor(message?: string) {
    super({
      code: ErrorCodeEnum.NoAccountConnectedError,
      message,
      reference: 'NoAccountConnectedError',
    });
  }
}
