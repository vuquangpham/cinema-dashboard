import axios from "axios";

export const debounce = function (func, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.call(null, ...args);
    }, delay);
  };
};

export const fetchData = async function (data) {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "6261b9cd",
      s: "captain",
    },
  });
  console.log(response.data);
};
