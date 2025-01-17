// errors
import BaseError from '@client/errors/BaseError';

interface IProps {
  error?: BaseError | null;
  onClose: () => void;
}

export default IProps;
