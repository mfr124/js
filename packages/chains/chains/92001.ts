import type { Chain } from "../src/types";
export default {
  "chain": "Lambda",
  "chainId": 92001,
  "explorers": [
    {
      "name": "Lambda EVM Explorer",
      "url": "https://explorer.lambda.top",
      "standard": "EIP3091"
    }
  ],
  "faucets": [
    "https://faucet.lambda.top"
  ],
  "features": [],
  "icon": {
    "url": "ipfs://QmWsoME6LCghQTpGYf7EnUojaDdYo7kfkWVjE6VvNtkjwy",
    "width": 500,
    "height": 500,
    "format": "png"
  },
  "infoURL": "https://lambda.im",
  "name": "Lambda Testnet",
  "nativeCurrency": {
    "name": "test-Lamb",
    "symbol": "LAMB",
    "decimals": 18
  },
  "redFlags": [],
  "rpc": [
    "https://lambda-testnet.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://evm.lambda.top/"
  ],
  "shortName": "lambda-testnet",
  "slug": "lambda-testnet",
  "testnet": true
} as const satisfies Chain;