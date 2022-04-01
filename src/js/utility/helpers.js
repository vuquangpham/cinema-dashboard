import axios from "axios";
import { TIME_OUT, URL } from "./config";

export const debounce = function (func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.call(null, ...args);
    }, delay);
  };
};

const timeout = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(`It took too long. Timeout after ${time / 1000} seconds.`);
    }, time);
  });
};

export const fetchData = async (urlParams) => {
  try {
    const fetchData = axios.get(URL, {
      params: {
        apikey: "6261b9cd",
        ...urlParams,
      },
    });

    const res = await Promise.race([fetchData, timeout(TIME_OUT)]);

    if (res.data.Error) {
      throw new Error("Can't find that movie, try again!");
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getJSON = (urlParams) => {
  return axios.get(URL, {
    params: {
      apikey: "6261b9cd",
      ...urlParams,
    },
  });
};
