// enums
import { ErrorCodeEnum } from '@client/enums';

// errors
import BaseError from '@client/errors/BaseError';

export default class UnknownError extends BaseError {
  constructor(message?: string) {
    super({
      code: ErrorCodeEnum.UnknownError,
      message,
      reference: 'UnknownError',
    });
  }
}
