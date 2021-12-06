import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const result = await $.ajax({
    async: true,
    dataType: 'binary',
    method: 'GET',
    responseType: 'arraybuffer',
    url,
  });
  return result;
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  // const request = new XMLHttpRequest();
  // request.responseType = 'json'
  // request.open('GET', url, true, null, null);
  // request.send();

  // request.addEventListener("load", function(){ // loadイベントを登録します。
  //   console.log(this);
  //   console.log('-----------------------------');
  //   console.log(this.response);
  //   return this.response;
  // }, false);

  const result = await $.ajax({
    async: true,
    dataType: 'json',
    method: 'GET',
    url,
  });
  console.log('==============================')
  console.log(result);
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const result = await $.ajax({
    async: true,
    data: file,
    dataType: 'json',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    method: 'POST',
    processData: false,
    url,
  });
  return result;
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const result = await $.ajax({
    async: true,
    data: compressed,
    dataType: 'json',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    processData: false,
    url,
  });
  return result;
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };