import "../sass/main.scss";
import { debounce, fetchData } from "../js/utility/helpers";
import { createToastMessage } from "./Toast.js";
fetchData({ s: "avengers" });

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const inputSearch = $(".search__input");
const searchSuggest = $(".search__suggest");

const onInput = async function (e) {
  const search = e.target.value.trim();

  if (!search) {
    searchSuggest.classList.remove("active");
    return;
  }

  try {
    searchSuggest.classList.add("active");
    const data = await fetchData({ s: search });
  } catch (error) {
    createToastMessage({ type: "error", message: error.message });
  }
  console.log(data);
};
inputSearch.addEventListener("input", debounce(onInput, 400));

`<li class="search__item "><label for="search" class="search__item--suggest"
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
<img src="./src/img/31283778_602203223490639_2727738473857116492_n.jpg" alt="Movie Img" class="search__suggest-img">
<span>Avenger</span></li>`;
