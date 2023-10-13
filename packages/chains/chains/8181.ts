import type { Chain } from "../src/types";
export default {
  "chain": "tBOC",
  "chainId": 8181,
  "explorers": [
    {
      "name": "Testnet BeOne Chain",
      "url": "https://testnet.beonescan.com",
      "standard": "none"
    }
  ],
  "faucets": [
    "https://testnet.beonescan.com/faucet"
  ],
  "features": [],
  "icon": {
    "url": "ipfs://QmbVLQnaMDu86bPyKgCvTGhFBeYwjr15hQnrCcsp1EkAGL",
    "width": 500,
    "height": 500,
    "format": "png"
  },
  "infoURL": "https://testnet.beonescan.com",
  "name": "Testnet BeOne Chain",
  "nativeCurrency": {
    "name": "Testnet BeOne Chain",
    "symbol": "tBOC",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://testnet-beone-chain.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://pre-boc1.beonechain.com"
  ],
  "shortName": "tBOC",
  "slug": "testnet-beone-chain",
  "testnet": true
} as const satisfies Chain;