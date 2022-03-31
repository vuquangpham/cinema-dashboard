import axios from "axios";
import { URL } from "./config";

export const debounce = function (func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.call(null, ...args);
    }, delay);
  };
};

export const fetchData = async function (urlParams) {
  const response = await axios.get(URL, {
    params: {
      apikey: "6261b9cd",
      ...urlParams,
    },
  });

  if (response.data.Error) {
    throw new Error("Can't find that movie, try again!");
  }
  return response.data;
};
