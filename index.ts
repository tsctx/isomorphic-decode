/**
 * @see https://infra.spec.whatwg.org/#isomorphic-decode
 */
export function isomorphicDecode(input: number[] | Uint8Array) {
  // 1. To isomorphic decode a byte sequence input, return a string whose code point
  //    length is equal to input’s length and whose code points have the same values
  //    as the values of input’s bytes, in the same order.
  const length = input.length;
  if ((2 << 15) - 1 > length) return String.fromCharCode.apply(null, input);
  let result = ""
  let i = 0;
  if ("buffer" in input) {
    let addition = (2 << 15) - 1;
    while (i < length) {
      if (i + addition > length) {
        addition = length - i;
      }
      result += String.fromCharCode.apply(
        null,
        input.subarray(i, i += addition) as unknown as number[],
      );
    }
    return result;
  }
  while (i + 32 < length) {
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
      input[i + 16],
      input[i + 17],
      input[i + 18],
      input[i + 19],
      input[i + 20],
      input[i + 21],
      input[i + 22],
      input[i + 23],
      input[i + 24],
      input[i + 25],
      input[i + 26],
      input[i + 27],
      input[i + 28],
      input[i + 29],
      input[i + 30],
      input[i + 31],
    );
    i += 32;
  }
  // Decode the remaining characters.
  while (i < length) result += String.fromCharCode(input[i++]);
  return result;
}
