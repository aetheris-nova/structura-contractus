// enums
import { ErrorCodeEnum } from '@client/enums';

// errors
import BaseError from '@client/errors/BaseError';

// types
import type { INewOptions } from './types';

export default class SmartAssemblyNotFoundError extends BaseError {
  public readonly id: string | null;

  constructor({ id, message }: INewOptions = {}) {
    super({
      code: ErrorCodeEnum.SmartAssemblyNotFoundError,
      message,
      reference: 'SmartAssemblyNotFoundError',
    });

    this.id = id || null;
  }
}
