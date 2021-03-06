import fetch from 'isomorphic-unfetch';
import queryString from 'query-string';


export default async function request(params) {
  const {
    url,
    query,
    method = 'GET',
    headers = {},
    body,
    formData,
    cookies = {},
  } = params;
  let requestUrl = url;

  if (query) {
    requestUrl += `?${queryString.stringify(query)}`;
  }

  const defaultHeaders = {};

  if (!formData) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  if (cookies) {
    defaultHeaders.Cookie = Object.keys(cookies).reduce((string, cookieName) => {
      const cookieValue = cookies[cookieName];

      return `${string}; ${cookieName}=${cookieValue}`;
    }, '');
  }

  const response = await fetch(requestUrl, {
    method,
    body: formData ? body : JSON.stringify(body),
    headers: { ...defaultHeaders, ...headers },
    credentials: 'include',
  });

  const json = await response.json();

  // TODO: maybe it's better not to throw an error when request resulted in non-success status code.
  // Maybe return an object with response and status instead (and a boolean "error")?
  if (!response.ok) {
    throw json;
  }

  return json;
}
