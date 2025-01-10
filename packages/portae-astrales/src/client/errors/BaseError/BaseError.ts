// enums
import { ErrorCodeEnum } from '@client/enums';

// types
import type { INewOptions } from './types';

export default abstract class BaseError extends Error {
  public readonly code: ErrorCodeEnum;
  public readonly reference: string;

  protected constructor({ code, reference, message }: INewOptions) {
    super(message);

    this.code = code;
    this.reference = reference;
  }
}
