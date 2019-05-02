
const _isDev = window.location.port.indexOf('4200') > -1;
const getHost = () => {
  const protocol = window.location.protocol;
  const host = window.location.host;
  return `${protocol}//${host}`;
};

const apiURI = _isDev ? 'http://localhost:5000/v1/' : `http://3.86.159.151:5000/v1/`;
const serverURI = _isDev ? 'http://localhost:5000/' : `http://3.86.159.151:5000/`;


export const ENV = {
  BASE_URI: getHost(),
  BASE_API: apiURI,
  AUTHOR: 'Anusha',
  SERVER_URL: serverURI
}
