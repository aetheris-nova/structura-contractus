import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type FC, type PropsWithChildren } from 'react';
import { http, webSocket } from 'viem';
import { anvil, garnet, redstone } from 'viem/chains';
import { createConfig, WagmiProvider } from 'wagmi';

const WalletConnectionProvider: FC<PropsWithChildren> = ({ children }) => {
  // misc
  const config = createConfig({
    chains: [anvil, garnet, redstone],
    transports: {
      [anvil.id]: webSocket(),
      [garnet.id]: http(),
      [redstone.id]: http(),
    },
  });
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default WalletConnectionProvider;
