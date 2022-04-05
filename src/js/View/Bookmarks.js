import View from "./View";

class Bookmarks extends View {
  _parentElm = document.querySelector(".bookmark");
  _errorMessage =
    "You haven't bookmarked yet! If you like some movies, bookmark it !!!";

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
        <img src="${movie.image}" alt="${movie.title}" class="bookmark__img">
        <span>${movie.title}</span>
      </li>
    `
      )
      .join("");
  }
}

export default new Bookmarks();
