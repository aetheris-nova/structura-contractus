// types
import type { ITranslation } from '@client/types';

export default {
  captions: {
    connectingToWallet: 'Connecting to wallet.',
    description: 'The great Portae Astrales of the Aetheris Nova facilitates the safe traversal of the Aether.',
    noWalletsAvailable: 'No wallets available.',
    selectAWallet: 'Choose a wallet to connect.',
    retrievingDetails: 'Retrieving details.',
  },
  headings: {
    details: 'Details',
    noCharacterDataFound: 'No character data found',
    noTerminalFound: 'No terminal found',
    selectAWallet: 'Select a Wallet',
    tokens: 'Tokens',
    welcome: 'Ave, advenae.',
    welcomeWithCharacter: 'Ave, advenae {{name}}',
  },
  labels: {
    address: 'Address',
    cancel: 'Cancel',
    characterDetails: 'Character Details',
    connect: 'Connect',
    disconnect: 'Disconnect',
    id: 'ID',
  },
  titles: {
    page: 'Portae Astrales',
    page_gate: 'Gate',
    page_terminal: 'Terminal',
  },
} satisfies ITranslation;
