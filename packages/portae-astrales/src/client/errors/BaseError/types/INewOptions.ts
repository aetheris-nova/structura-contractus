// enums
import { ErrorCodeEnum } from '@client/enums';

interface INewOptions {
  code: ErrorCodeEnum;
  message?: string;
  reference: string;
}

export default INewOptions;
