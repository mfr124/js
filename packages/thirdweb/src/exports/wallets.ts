export type {
  Wallet,
  Account,
  WalletWithPersonalAccount,
} from "../wallets/interfaces/wallet.js";
export type { WalletEventListener } from "../wallets/interfaces/listeners.js";
export type { WalletMetadata } from "../wallets/types.js";

export type { ConnectionStatus } from "../wallets/manager/index.js";
export { createConnectionManager } from "../wallets/manager/index.js";

export {
  getWalletBalance,
  type GetWalletBalanceOptions,
} from "../wallets/utils/getWalletBalance.js";

// private-key
export {
  privateKeyAccount,
  type PrivateKeyAccountOptions,
} from "../wallets/private-key.js";

// injected
export { getMIPDStore } from "../wallets/injected/mipdStore.js";

export { injectedProvider } from "../wallets/injected/mipdStore.js";

// wallet-connect

export type {
  WalletConnectConnectionOptions,
  WalletConnectCreationOptions,
} from "../wallets/wallet-connect/types.js";

// smart
// export { smartWallet, type SmartWallet } from "../wallets/smart/index.js";
// export type {
//   SmartWalletOptions,
//   SmartWalletConnectionOptions,
// } from "../wallets/smart/types.js";

export {
  getStoredActiveWalletId,
  getStoredConnectedWalletIds,
} from "../wallets/manager/index.js";

// export {
//   coinbaseSDKWallet,
//   type CoinbaseSDKWalletOptions,
//   type CoinbaseSDKWalletConnectionOptions,
//   type CoinbaseSDKWallet,
// } from "../wallets/coinbase/coinbaseSDKWallet.js";

// export {
//   embeddedWallet,
//   type EmbeddedWallet,
//   type EmbeddedWalletConnectionOptions,
// } from "../wallets/embedded/core/wallet/index.js";
// export type { EmbeddedWalletCreationOptions } from "../wallets/embedded/core/wallet/types.js";
// export type { AuthenticatedUser } from "../wallets/embedded/core/wallet/types.js";

// export {
//   type MultiStepAuthArgsType,
//   type SingleStepAuthArgsType,
// } from "../wallets/embedded/core/authentication/type.js";

// local wallet
// export {
//   localWallet,
//   type LocalWallet,
//   type LocalWalletConnectionOptions,
//   type LocalWalletCreationOptions,
// } from "../wallets/local/index.js";
// export type {
//   LocalWalletDecryptOptions,
//   LocalWalletEncryptOptions,
//   LocalWalletExportOptions,
//   LocalWalletImportOptions,
//   LocalWalletLoadOptions,
//   LocalWalletLoadOrCreateOptions,
//   LocalWalletSaveOptions,
//   LocalWalletStorageData,
// } from "../wallets/local/types.js";
