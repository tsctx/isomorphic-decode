/**
 * @see https://infra.spec.whatwg.org/#isomorphic-decode
 */
export function isomorphicDecode(input: number[] | Uint8Array) {
  // 1. To isomorphic decode a byte sequence input, return a string whose code point
  //    length is equal to input’s length and whose code points have the same values
  //    as the values of input’s bytes, in the same order.
  const length = input.length;
  if ((2 << 15) - 1 > length) return String.fromCharCode.apply(null, input);
  if ("buffer" in input) {
    let addition = (2 << 15) - 1;
    let result = "";
    for (let i = 0; i < length; i += addition) {
      if (i + addition > length) {
        addition = length - i;
      }
      result += String.fromCharCode.apply(
        null,
        input.subarray(i, i + addition) as unknown as number[],
      );
    }
    return result;
  }
  let result = "",
    i = 0;
  while (i + 16 < length) {
    result += String.fromCharCode(
      input[i],
      input[i + 1],
      input[i + 2],
      input[i + 3],
      input[i + 4],
      input[i + 5],
      input[i + 6],
      input[i + 7],
      input[i + 8],
      input[i + 9],
      input[i + 10],
      input[i + 11],
      input[i + 12],
      input[i + 13],
      input[i + 14],
      input[i + 15],
    );
    i += 16
  }
  while (i < length) result += String.fromCharCode(input[i++]);
  return result;
}
