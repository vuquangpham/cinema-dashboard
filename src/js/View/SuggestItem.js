import View from "./View";

class SuggestItem extends View {
  _parentElm = document.querySelector(".search__suggest");

  hideSuggest() {
    this._parentElm.classList.remove("active");
  }

  showSuggest() {
    this._parentElm.classList.add("active");
  }

  handleShowSuggestMovie(handler) {
    this._parentElm.addEventListener("click", function (e) {
      const movie = e.target.closest(".search__item");
      if (!movie) return;
      const id = +movie.dataset.id;
      handler(id);
    });
  }

  _generateMarkup() {
    return this._data
      .map(
        (d, idx) => `
    <li class="search__item" data-id="${idx}">
      <label for="search" class="search__item--suggest">
        <svg
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
      <img src="${d.image}" alt="${d.title}" class="search__suggest-img">
      <span>${d.title}</span></li>`
      )
      .join("");
  }
}

export default new SuggestItem();
