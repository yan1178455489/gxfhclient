
export function makeQueryURL(url, params) {
    if (params) {
      let paramsArray = Object.keys(params).map(key => key + '=' + params[key]);
      if (url.search(/\?/) === -1) {
        return url + '?' + paramsArray.join('&');
      } else {
        return url + '&' + paramsArray.join('&');
      }
    }
    return url;
}
