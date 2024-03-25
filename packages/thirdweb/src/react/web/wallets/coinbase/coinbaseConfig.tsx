import { coinbaseMetadata } from "../../../../wallets/coinbase/coinbaseMetadata.js";
import {
  CoinbaseSDKWallet,
  coinbaseSDKWallet,
} from "../../../../wallets/coinbase/coinbaseSDKWallet.js";
import {
  coinbaseWallet,
  injectedCoinbaseProvider,
} from "../../../../wallets/injected/wallets/coinbase.js";
import { useWalletConnectionCtx } from "../../../core/hooks/others/useWalletConnectionCtx.js";
import type {
  ConnectUIProps,
  WalletConfig,
} from "../../../core/types/wallets.js";
import { asyncLocalStorage } from "../../../core/utils/asyncLocalStorage.js";
import type { LocaleId } from "../../ui/types.js";
import { getInjectedWalletLocale } from "../injected/locale/getInjectedWalletLocale.js";
import type { InjectedWalletLocale } from "../injected/locale/types.js";
import { GetStartedScreen } from "../shared/GetStartedScreen.js";
import { InjectedConnectUI } from "../shared/InjectedConnectUI.js";
import { LoadingScreen } from "../shared/LoadingScreen.js";
import { ScanScreen } from "../shared/ScanScreen.js";
import { useState, useRef, useEffect } from "react";

export type CoinbaseConfigOptions = {
  /**
   * If `true`, Coinbase Wallet will be shown as "recommended" to the user in [`ConnectButton`](https://portal.thirdweb.com/typescript/v5/react/components/ConnectButton)
   * or [`ConnectEmbed`](https://portal.thirdweb.com/typescript/v5/react/components/ConnectEmbed) 's UI
   */
  recommended?: boolean;
};

/**
 * Integrate Coinbase wallet connection in
 * [`ConnectButton`](https://portal.thirdweb.com/typescript/v5/react/components/ConnectButton)
 * or [`ConnectEmbed`](https://portal.thirdweb.com/typescript/v5/react/components/ConnectEmbed) by adding it in the `wallets` prop.
 * @param options - Options for configuring the Coinbase wallet.
 * Refer to [`CoinbaseConfigOptions`](https://portal.thirdweb.com/references/typescript/v5/MetamaskConfigOptions) for more details.
 * @example
 * ```tsx
 * import { ConnectButton, coinbaseConfig } from "thirdweb/react";
 *
 * function Example() {
 *   return (
 *     <ConnectButton
 *      client={client}
 *      wallets={[coinbaseConfig()]}
 *      appMetadata={appMetadata}
 *     />
 *   );
 * }
 * ```
 * @returns `WalletConfig` object which can be added to the `wallets` prop in either `ConnectButton` or `ConnectEmbed` component.
 * @walletConfig
 */
export const coinbaseConfig = (
  options?: CoinbaseConfigOptions,
): WalletConfig => {
  let prefetchedLocale: InjectedWalletLocale;
  let prefetchedLocaleId: LocaleId;

  return {
    recommended: options?.recommended,
    metadata: coinbaseMetadata,
    create(createOptions) {
      const isInjected = !!injectedCoinbaseProvider();
      if (isInjected) {
        return coinbaseWallet();
      } else {
        return coinbaseSDKWallet({
          appName: createOptions.appMetadata.name,
          appLogoUrl: createOptions.appMetadata.logoUrl,
          storage: asyncLocalStorage,
        });
      }
    },
    connectUI(props) {
      return (
        <CoinbaseConnectUI
          connectUIProps={props}
          prefetchedLocale={prefetchedLocale}
          prefetchedLocaleId={prefetchedLocaleId}
        />
      );
    },
    isInstalled() {
      return !!injectedCoinbaseProvider();
    },
    async prefetch(localeId) {
      const localeFn = await getInjectedWalletLocale(localeId);
      prefetchedLocale = localeFn(coinbaseMetadata.name);
      prefetchedLocaleId = localeId;
    },
  };
};

const links = {
  chrome:
    "https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad",
  android: "https://play.google.com/store/apps/details?id=org.toshi",
  ios: "https://apps.apple.com/us/app/coinbase-wallet-nfts-crypto/id1278383455",
};

function CoinbaseConnectUI(props: {
  connectUIProps: ConnectUIProps;
  prefetchedLocale?: InjectedWalletLocale;
  prefetchedLocaleId?: LocaleId;
}) {
  const isInjected = !!injectedCoinbaseProvider();
  const [screen, setScreen] = useState<"main" | "get-started">("main");
  const walletConfig = props.connectUIProps.walletConfig;
  const { locale: localeId } = useWalletConnectionCtx();

  const [locale, setLocale] = useState<InjectedWalletLocale | undefined>(
    props.prefetchedLocaleId === localeId ? props.prefetchedLocale : undefined,
  );

  useEffect(() => {
    getInjectedWalletLocale(localeId).then((_local) => {
      setLocale(_local(props.connectUIProps.walletConfig.metadata.name));
    });
  }, [localeId, props.connectUIProps.walletConfig.metadata.name]);

  if (!locale) {
    return <LoadingScreen />;
  }

  if (screen === "get-started") {
    return (
      <GetStartedScreen
        locale={locale}
        walletIconURL={walletConfig.metadata.iconUrl}
        walletName={walletConfig.metadata.name}
        chromeExtensionLink={links.chrome}
        googlePlayStoreLink={links.android}
        appleStoreLink={links.ios}
        onBack={() => {
          setScreen("main");
        }}
      />
    );
  }

  if (isInjected) {
    return (
      <InjectedConnectUI
        locale={locale}
        {...props.connectUIProps}
        onGetStarted={() => {
          setScreen("get-started");
        }}
      />
    );
  }

  return (
    <CoinbaseSDKWalletConnectUI
      connectUIProps={props.connectUIProps}
      onGetStarted={() => {
        setScreen("get-started");
      }}
      locale={locale}
    />
  );
}

function CoinbaseSDKWalletConnectUI(props: {
  connectUIProps: ConnectUIProps;
  onGetStarted: () => void;
  locale: InjectedWalletLocale;
}) {
  const { connectUIProps, onGetStarted } = props;
  const locale = props.locale;
  const { createInstance, done, chain } = connectUIProps.connection;
  const [qrCodeUri, setQrCodeUri] = useState<string | undefined>(undefined);

  const scanStarted = useRef(false);

  useEffect(() => {
    if (scanStarted.current) {
      return;
    }

    scanStarted.current = true;

    (async () => {
      const wallet = createInstance() as CoinbaseSDKWallet;

      try {
        await wallet.connect({
          reloadOnDisconnect: false,
          chain: chain ? chain : undefined,
          onUri(uri) {
            if (uri) {
              setQrCodeUri(uri);
            } else {
              // show error
            }
          },
          headlessMode: true,
        });

        done(wallet);
      } catch {
        // show error
      }
    })();
  }, [chain, createInstance, done]);

  return (
    <ScanScreen
      qrScanInstruction={locale.scanScreen.instruction}
      onBack={connectUIProps.screenConfig.goBack}
      onGetStarted={onGetStarted}
      qrCodeUri={qrCodeUri}
      walletName={connectUIProps.walletConfig.metadata.name}
      walletIconURL={connectUIProps.walletConfig.metadata.iconUrl}
      getStartedLink={locale.getStartedLink}
    />
  );
}