export default function trim(str: string, dictStr?: string): string {
  let result = str.trim();
  if (dictStr) {
    let start = 0;
    let stop = result.length - 1;
    while (dictStr.includes(result[start])) {
      start++;
    }
    while (dictStr.includes(result[stop])) {
      stop--;
    }
    result = result.slice(start, stop + 1);
  }
  console.log(result);
  return result;
}
