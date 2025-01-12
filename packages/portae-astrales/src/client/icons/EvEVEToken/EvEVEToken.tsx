import { Icon, IconProps } from '@chakra-ui/react';
import type { FC } from 'react';

const EvEVEToken: FC<IconProps> = (props) => {
  return (
    <Icon {...props}>
      <svg viewBox="0 0 20 26">
        <path
          d="M8.594 0h2.666v2.785H8.594V0ZM0 9.206h3.61V8.021H20V4.49H0v4.715ZM3.61 16.299H0v4.729h20V17.52H3.61V16.3ZM20 14.52H0v-3.513h20v3.513ZM11.26 23.215H8.594V26h2.666v-2.785Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  );
};

export default EvEVEToken;
