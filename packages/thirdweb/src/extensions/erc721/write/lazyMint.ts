import type { FileOrBufferOrString } from "../../../storage/upload/types.js";
import { prepareContractCall } from "../../../transaction/prepare-contract-call.js";
import type { BaseTransactionOptions } from "../../../transaction/types.js";
import {
  getBaseUriFromBatch,
  uploadOrExtractURIs,
} from "../../../utils/ipfs.js";
import type { Prettify } from "../../../utils/type-utils.js";
import { nextTokenIdToMint } from "../__generated__/IERC721Enumerable/read/nextTokenIdToMint.js";

/**
 * Represents the input data for creating an NFT (Non-Fungible Token).
 */
type NFTInput = Prettify<
  {
    name?: string;
    description?: string;
    image?: FileOrBufferOrString;
    animation_url?: FileOrBufferOrString;
    external_url?: FileOrBufferOrString;
    background_color?: string;
    // TODO check if we truly need both of these?
    properties?: Record<string, unknown> | Array<Record<string, unknown>>;
  } & Record<string, unknown>
>;

export type LazyMintParams = {
  nfts: (NFTInput | string)[];
};

/**
 * Lazily mints ERC721 tokens.
 * @param options - The options for the lazy minting process.
 * @returns A promise that resolves to the prepared contract call.
 * @extension ERC721
 * @example
 * ```ts
 * import { lazyMint } from "thirdweb/extensions/erc721";
 *
 * const tx = await lazyMint({
 * contract,
 * nfts: [
 *    {
 *      name: "My NFT",
 *      description: "This is my NFT",
 *      image: "https://example.com/image.png",
 *    },
 *  ],
 * });
 * ```
 */
export async function lazyMint(
  options: BaseTransactionOptions<LazyMintParams>,
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0xd37c353b",
      [
        {
          type: "uint256",
          name: "amount",
        },
        {
          type: "string",
          name: "baseURIForTokens",
        },
        {
          type: "bytes",
          name: "extraData",
        },
      ],
      [
        {
          type: "uint256",
          name: "batchId",
        },
      ],
    ],
    params: async () => {
      const startFileNumber = await nextTokenIdToMint({
        contract: options.contract,
      });

      const batchOfUris = await uploadOrExtractURIs(
        options.nfts,
        options.contract.client,
        // TODO: this is potentially unsafe since it *may* be bigger than what Number can represent, however the likelyhood is very low (fine, for now)
        Number(startFileNumber),
      );

      const baseUri = getBaseUriFromBatch(batchOfUris);

      return [
        BigInt(batchOfUris.length),
        baseUri.endsWith("/") ? baseUri : `${baseUri}/`,
        // extra data: empty
        "0x",
      ] as const;
    },
  });
}