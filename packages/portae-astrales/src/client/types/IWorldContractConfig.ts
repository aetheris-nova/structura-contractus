interface IWorldContractConfig {
  contractsVersion: string;
  eveToken: Record<'address', string>;
  forwarder: Record<'address', string>;
  lensSeller: Record<'address', string>;
  world: Record<'address', string>;
}

export default IWorldContractConfig;
