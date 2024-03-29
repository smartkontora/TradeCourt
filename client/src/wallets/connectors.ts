import { configureChains, chain, createClient } from 'wagmi'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.goerli, chain.polygon],
  [infuraProvider({ apiKey: import.meta.env.VITE_INFURA_ID })]
)

export const connectors = [
  new MetaMaskConnector({ chains }),
  new WalletConnectConnector({ chains, options: {} }),
  new CoinbaseWalletConnector({ chains, options: { appName: 'Trade Court' } })
]

export const wagmiClient = createClient({
  connectors,
  autoConnect: true,
  provider,
  webSocketProvider
})
