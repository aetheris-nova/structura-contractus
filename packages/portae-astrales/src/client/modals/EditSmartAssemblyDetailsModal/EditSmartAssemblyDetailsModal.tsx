import { Button, type IBaseComponentProps, Field, Input, Modal, Textarea } from '@aetherisnova/ui-components';
import { VStack } from '@chakra-ui/react';
import { type ChangeEvent, type FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from 'wagmi';

// constants
import { DEFAULT_GAP } from '@client/constants';

// selectors
import { useSelectColorMode } from '@client/selectors';

// types
import type { IProps } from './types';

// utils
import useStore from '@client/utils/useStore';

const EditSmartAssemblyDetailsModal: FC<IProps> = ({ onClose, open, smartAssembly }) => {
  const { t } = useTranslation();
  const wagmiConfig = useConfig();
  const { setSmartAssemblyMetadataAction }  = useStore();
  // selectors
  const colorMode = useSelectColorMode();
  // memos
  const baseProps = useMemo<Partial<IBaseComponentProps>>(() => ({
    colorMode,
  }), [colorMode]);
  // states
  const [dappURL, setDappURL] = useState(smartAssembly.dappUrl);
  const [description, setDescription] = useState(smartAssembly.description);
  const [name, setName] = useState(smartAssembly.name);
  // handlers
  const handleClose = () => {
    setDappURL(smartAssembly.dappUrl);
    setDescription(smartAssembly.description);
    setName(smartAssembly.name);

    onClose && onClose();
  };
  const handleOnCancelClick = () => handleClose();
  const handleOnChange = (field: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    switch (field) {
      case 'dappURL':
        setDappURL(event.target.value);
        break;
      case 'description':
        setDescription(event.target.value);
        break;
      case 'name':
        setName(event.target.value);
        break;
      default:
        break;
    }
  };
  const handleOnSubmitClick = async () => {
    let result: boolean;

    // if there are no changes, no need to update
    if (dappURL === smartAssembly.dappUrl && description === smartAssembly.description && name === smartAssembly.name) {
      handleClose();
    }

    result = await setSmartAssemblyMetadataAction({
      dappURL,
      description,
      name,
      t,
      wagmiConfig,
    });

    if (result) {
      handleClose();
    }
  };

  useEffect(() => {
    setDappURL(smartAssembly.dappUrl);
    setDescription(smartAssembly.description);
    setName(smartAssembly.name);
  }, [open]);

  return (
    <Modal
      body={(
        <VStack gap={DEFAULT_GAP / 3} w="full">
          <Field {...baseProps} label={t('labels.name').toUpperCase()}>
            <Input
              onChange={handleOnChange('name')}
              type="text"
              value={name}
            />
          </Field>

          <Field label={t('labels.url').toUpperCase()}>
            <Input
              onChange={handleOnChange('dappURL')}
              type="url"
              value={dappURL}
            />
          </Field>

          <Field label={t('labels.description').toUpperCase()}>
            <Textarea
              onChange={handleOnChange('description')}
              value={description}
            />
          </Field>
        </VStack>
      )}
      footer={[
        (
          <Button borderRightWidth={0} onClick={handleOnCancelClick}  scheme="secondary" variant="ghost">
            {t('labels.cancel')}
          </Button>
        ),
        (
          <Button onClick={handleOnSubmitClick} variant="ghost">
            {t('labels.submit')}
          </Button>
        ),
      ]}
      closeButton={true}
      open={open}
      onClose={handleClose}
      title={t('headings.editDetails')}
    />
  );
};

export default EditSmartAssemblyDetailsModal;
