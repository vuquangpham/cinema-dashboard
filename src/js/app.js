import "../sass/main.scss";
import { debounce, fetchData } from "../js/utility/helpers";
import { createToastMessage } from "./Toast.js";
fetchData({ s: "avengers" });

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const inputSearch = $(".search__input");
const searchSuggest = $(".search__suggest");

const generateSuggestItemMarkup = (data) => {
  return `
  <li class="search__item "><label for="search" class="search__item--suggest"
><svg
  xmlns="http://www.w3.org/2000/svg"
  class="header__icon header__icon--stroke"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
  />
</svg>
</label> 
<img src="${data.Poster}" alt="${data.Title}" class="search__suggest-img">
<span>${data.Title}</span></li>
  `;
};

const onInput = async function (e) {
  const search = encodeURI(e.target.value.trim());

  if (!search) {
    searchSuggest.classList.remove("active");
    searchSuggest.innerHTML = "";
    return;
  }

  try {
    const data = await fetchData({ s: search });
    searchSuggest.classList.add("active");
    const searchItems = data.Search;
    const markup = searchItems.map(generateSuggestItemMarkup);
    searchSuggest.innerHTML = markup.join("");
  } catch (error) {
    searchSuggest.classList.remove("active");
    createToastMessage({ type: "error", message: error.message });
    searchSuggest.innerHTML = "";
  }
};
inputSearch.addEventListener("input", debounce(onInput, 400));
