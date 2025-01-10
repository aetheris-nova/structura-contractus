import { DialogBody, DialogContent, DialogRoot, HStack, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LoadingDialog: FC = () => {
  const { t } = useTranslation();

  return (
    <DialogRoot
      motionPreset="none"
      placement="center"
    >
      <DialogContent>
        <DialogBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default LoadingDialog;
