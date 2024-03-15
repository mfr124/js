import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import type { AbiParameterToPrimitiveType } from "abitype";

/**
 * Represents the parameters for the "onERC1155BatchReceived" function.
 */
export type OnERC1155BatchReceivedParams = {
  operator: AbiParameterToPrimitiveType<{ type: "address"; name: "operator" }>;
  from: AbiParameterToPrimitiveType<{ type: "address"; name: "from" }>;
  ids: AbiParameterToPrimitiveType<{ type: "uint256[]"; name: "ids" }>;
  values: AbiParameterToPrimitiveType<{ type: "uint256[]"; name: "values" }>;
  data: AbiParameterToPrimitiveType<{ type: "bytes"; name: "data" }>;
};

/**
 * Calls the "onERC1155BatchReceived" function on the contract.
 * @param options - The options for the "onERC1155BatchReceived" function.
 * @returns A prepared transaction object.
 * @extension ERC1155
 * @example
 * ```
 * import { onERC1155BatchReceived } from "thirdweb/extensions/erc1155";
 *
 * const transaction = onERC1155BatchReceived({
 *  operator: ...,
 *  from: ...,
 *  ids: ...,
 *  values: ...,
 *  data: ...,
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function onERC1155BatchReceived(
  options: BaseTransactionOptions<OnERC1155BatchReceivedParams>,
) {
  return prepareContractCall({
    contract: options.contract,
    method: [
      "0xbc197c81",
      [
        {
          type: "address",
          name: "operator",
        },
        {
          type: "address",
          name: "from",
        },
        {
          type: "uint256[]",
          name: "ids",
        },
        {
          type: "uint256[]",
          name: "values",
        },
        {
          type: "bytes",
          name: "data",
        },
      ],
      [
        {
          type: "bytes4",
        },
      ],
    ],
    params: [
      options.operator,
      options.from,
      options.ids,
      options.values,
      options.data,
    ],
  });
}