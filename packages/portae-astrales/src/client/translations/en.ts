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
    assemblies: 'Assemblies',
    details: 'Details',
    noAssembliesFound: 'No assemblies found',
    noCharacterDataFound: 'No character data found',
    noTerminalFound: 'No terminal found',
    selectAWallet: 'Select a Wallet',
    tokens: 'Tokens',
    welcome: 'Ave, advenae.',
    welcomeWithCharacter: 'Ave, advenae {{name}}',
  },
  labels: {
    address: 'Address',
    anchored: 'Anchored',
    notAnchored: ' Not anchored',
    cancel: 'Cancel',
    characterDetails: 'Character Details',
    connect: 'Connect',
    disconnect: 'Disconnect',
    id: 'ID',
    offline: 'Offline',
    online: 'Online',
    smartAssemblyType: 'Unknown Assembly',
    smartAssemblyType_SmartGate: 'Smart Gate',
    smartAssemblyType_SmartStorageUnit: 'Smart Storage Unit',
    smartAssemblyType_SmartTurret: 'Smart Turret',
  },
  titles: {
    page: 'Portae Astrales',
    page_gate: 'Gate',
    page_terminal: 'Terminal',
  },
} satisfies ITranslation;
