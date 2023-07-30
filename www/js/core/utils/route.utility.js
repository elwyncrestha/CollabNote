export function getURLParam(paramName) {
  const params = new URLSearchParams(document.location.search);
  return params.get(paramName);
}
