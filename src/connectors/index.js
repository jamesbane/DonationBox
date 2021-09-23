import { InjectedConnector } from '@web3-react/injected-connector'

export const ALL_SUPPORTED_CHAIN_IDS = [
  5 // Goerli
];


export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
});

export const NETWORK_URLS = {
  1: `https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
  5: `https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161`,
};