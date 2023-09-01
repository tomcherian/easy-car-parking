import axios from "axios";

const SERVICE_URL = process.env.REACT_APP_BE_BASE_URL;

export class ServiceCalls {
  static get(api, headers, params) {
    const URL = SERVICE_URL + api;
    return new Promise((resolve, reject) => {
      axios
        .get(URL, { headers: headers.headers, params })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static post(api, body, headers, params) {
    const URL = SERVICE_URL + api;
    return new Promise((resolve, reject) => {
      axios
        .post(URL, body, { headers: headers?.headers, params })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static put(api, body, headers, params) {
    const URL = SERVICE_URL + api;
    return new Promise((resolve, reject) => {
      axios
        .put(URL, body, { headers: headers.headers, params })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }

  static delete(api, headers, params) {
    const URL = SERVICE_URL + api;
    return new Promise((resolve, reject) => {
      axios
        .get(URL, { headers: headers.headers, params })
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}

export const setHeaders = () => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  };
  return {
    headers,
  };
};
