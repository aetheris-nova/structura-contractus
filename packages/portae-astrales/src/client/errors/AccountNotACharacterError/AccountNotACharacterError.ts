// enums
import { ErrorCodeEnum } from '@client/enums';

// errors
import BaseError from '@client/errors/BaseError';

// types
import type { INewOptions } from './types';

export default class AccountNotACharacterError extends BaseError {
  public readonly address: string;

  constructor({ address, message }: INewOptions) {
    super({
      code: ErrorCodeEnum.AccountNotACharacterError,
      message,
      reference: 'AccountNotACharacterError',
    });

    this.address = address;
  }
}
