import View from "./View";

class Bookmarks extends View {
  _parentElm = document.querySelector(".bookmark");
  _errorMessage = "Failed to load bookmarks. Please try again!!!";

  handleRender(handler) {
    window.addEventListener("load", handler);
  }

  handleRemoveBookmark(handler) {
    this._parentElm.addEventListener("click", function (e) {
      const bookmark = e.target.closest(".bookmark__item");
      if (!bookmark) return;
      const id = +bookmark.dataset.id;
      handler(id);
    });
  }

  _generateMarkup() {
    return this._data
      .map(
        (movie, idx) => `
      <li class="bookmark__item" data-id="${idx}">
        <img src="${movie.Poster}" alt="${movie.Title}" class="bookmark__img">
        <span>${movie.Title}</span>
      </li>
    `
      )
      .join("");
  }
}

export default new Bookmarks();
