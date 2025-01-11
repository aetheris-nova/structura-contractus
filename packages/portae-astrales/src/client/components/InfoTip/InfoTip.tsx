import { IconButton } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';
import { GrCircleInformation } from 'react-icons/gr';

// components
import ToggleTip from '@client/components/ToggleTip';

// types
import type { IProps } from '@client/components/ToggleTip';

const InfoTip: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, IProps>(({
  children,
  ...otherProps
}, ref) => {
  return (
    <ToggleTip content={children} {...otherProps} ref={ref}>
      <IconButton
        variant="ghost"
        aria-label="info"
        size="2xs"
        colorPalette="gray"
      >
        <GrCircleInformation />
      </IconButton>
    </ToggleTip>
  );
});

InfoTip.displayName = 'InfoTip';

export default InfoTip;
