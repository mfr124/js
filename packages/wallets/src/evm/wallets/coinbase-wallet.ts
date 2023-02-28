import type { CoinbaseWalletConnector } from "../connectors/coinbase-wallet";
import { TWConnector, WagmiAdapter } from "../interfaces/tw-connector";
import { AbstractBrowserWallet, WalletOptions } from "./base";
import { Buffer } from "buffer";

// Coinbase SDK uses Buffer which requires a global polyfill
window.Buffer = Buffer;

export class CoinbaseWallet extends AbstractBrowserWallet<{
  darkMode: boolean;
}> {
  connector?: TWConnector;
  coinbaseConnector?: CoinbaseWalletConnector;

  static id = "coinbaseWallet" as const;
  public get walletName() {
    return "Coinbase Wallet" as const;
  }

  constructor(options: WalletOptions<{ darkMode: boolean }>) {
    super(CoinbaseWallet.id, options);
  }

  protected async getConnector(): Promise<TWConnector> {
    if (!this.connector) {
      // import the connector dynamically
      const { CoinbaseWalletConnector } = await import(
        "../connectors/coinbase-wallet"
      );

      const cbConnector = new CoinbaseWalletConnector({
        chains: this.chains,
        options: {
          appName: this.options.dappMetadata.name,
          reloadOnDisconnect: false,
          darkMode: this.options.darkMode,
          headlessMode: true,
        },
      });

      cbConnector.on("connect", () => {
        console.log("Coinbase Wallet connected");
      });

      this.coinbaseConnector = cbConnector;
      this.connector = new WagmiAdapter(cbConnector);
    }
    return this.connector;
  }

  async getQrCode() {
    await this.getConnector();
    if (!this.coinbaseConnector) {
      throw new Error("Coinbase connector not initialized");
    }
    return this.coinbaseConnector!.getQrCode();
  }
}
