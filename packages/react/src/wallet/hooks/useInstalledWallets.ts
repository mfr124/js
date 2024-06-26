import {
  assertWindowEthereum,
  getInjectedCoinbaseProvider,
  getInjectedMetamaskProvider,
} from "@thirdweb-dev/wallets";

/**
 * @internal
 */
export function useInstalledWallets() {
  let isMetamaskInstalled = false;
  let isCoinbaseWalletInstalled = false;
  let isZerionWalletInstalled = false;
  let isTrustWalletInstalled = false;
  let isImTokenInstalled = false;

  const window_: Window | undefined = globalThis?.window;
  if (assertWindowEthereum(window_)) {
    isMetamaskInstalled = !!getInjectedMetamaskProvider();
    isCoinbaseWalletInstalled = !!getInjectedCoinbaseProvider();
    isZerionWalletInstalled = !!window_.ethereum?.isZerion;
    isTrustWalletInstalled = !!window_.ethereum?.isTrust;
    isImTokenInstalled = !!window_.ethereum?.isToken;
  }

  return {
    metamask: isMetamaskInstalled,
    coinbaseWallet: isCoinbaseWalletInstalled,
    trustWallet: isTrustWalletInstalled,
    zerionWallet: isZerionWalletInstalled,
    imtokenWallet: isImTokenInstalled,
  };
}
