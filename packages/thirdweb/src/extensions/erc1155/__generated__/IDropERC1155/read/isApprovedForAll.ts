import { readContract } from "../../../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import type { AbiParameterToPrimitiveType } from "abitype";

/**
 * Represents the parameters for the "isApprovedForAll" function.
 */
export type IsApprovedForAllParams = {
  account: AbiParameterToPrimitiveType<{ type: "address"; name: "account" }>;
  operator: AbiParameterToPrimitiveType<{ type: "address"; name: "operator" }>;
};

/**
 * Calls the "isApprovedForAll" function on the contract.
 * @param options - The options for the isApprovedForAll function.
 * @returns The parsed result of the function call.
 * @extension ERC1155
 * @example
 * ```
 * import { isApprovedForAll } from "thirdweb/extensions/erc1155";
 *
 * const result = await isApprovedForAll({
 *  account: ...,
 *  operator: ...,
 * });
 *
 * ```
 */
export async function isApprovedForAll(
  options: BaseTransactionOptions<IsApprovedForAllParams>,
) {
  return readContract({
    contract: options.contract,
    method: [
      "0xe985e9c5",
      [
        {
          type: "address",
          name: "account",
        },
        {
          type: "address",
          name: "operator",
        },
      ],
      [
        {
          type: "bool",
        },
      ],
    ],
    params: [options.account, options.operator],
  });
}