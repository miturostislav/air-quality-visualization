interface AjaxRequest {
  method: 'GET' | 'POST';
  url: string;
  data?: {[key: string]: any};
  fields?: RequestInit;
}

export default function ajaxRequest({
  method,
  url,
  data,
  fields = {},
}: AjaxRequest): Promise<any> {
  const mappedUrl = method === 'GET' && data ? `${url}?${toQueryParams(data)}` : url;
  return fetch(
    mappedUrl,
    {
      method,
      credentials: 'same-origin',
      ...fields
    }
  )
    .then(status)
    .then(json);
}

function status(response: Response): Promise<Response> {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
}

function json(response: Response): Promise<any> {
  return response.json();
}

function toQueryParams(data: {[key: string]: any}): string {
  return Object.keys(data)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}
