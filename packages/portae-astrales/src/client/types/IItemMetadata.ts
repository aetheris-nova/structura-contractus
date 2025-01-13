// types
import type IItemMetadataAttributes from './IItemMetadataAttributes';

interface IItemMetadata {
  attributes: IItemMetadataAttributes[];
  description: string;
  image: string;
  name: string;
  smartItemId: string;
}

export default IItemMetadata;
