/**
 * [URLSearchParams - Web APIs | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
 */
export function getURLParam(paramName) {
  const params = new URLSearchParams(document.location.search);
  return params.get(paramName);
}
