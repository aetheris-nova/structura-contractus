import { BaseError } from '@aetherisnova/errors';

interface IProps {
  error?: BaseError | null;
  onClose: () => void;
}

export default IProps;
