import View from "./View";

class PopularMovies extends View {
  _parentElm = document.querySelector(".popular-movies__list-card");
  _errorMessage = "Failed to load popular movies. Please try again!!!";

  handleAddToBookmark(handler) {
    this._parentElm.addEventListener("click", function (e) {
      const btnAddBookmark = e.target.closest(".btn__movie--watch");
      if (!btnAddBookmark) return;
      const id = +btnAddBookmark.parentElement.parentElement.dataset.id;
      handler(id);
    });
  }

  handleShowDetail(handler) {
    this._parentElm.addEventListener("click", function (e) {
      const btnAddBookmark = e.target.closest(".btn__movie--detail");
      if (!btnAddBookmark) return;
      const id = +btnAddBookmark.parentElement.parentElement.dataset.id;
      handler(id);
    });
  }

  handlePageLoad(handler) {
    window.addEventListener("load", handler);
  }

  _generateMarkup() {
    return this._data
      .map(
        (d, idx) => `
    <div class="popular-movies__card" data-id="${idx}">
      <div class="movie__img">
        <img src="${d.image}" alt="Movie" />
        <div class="overlay"></div>
        <div class="btn__movie btn__movie--watch">Watch</div>
        <div class="btn__movie btn__movie--detail">Detail</div>
      </div>
      <div class="movie__info">
        <div class="movie__name">${d.title}</div>
        <span class="movie__star">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="star"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
          <span class="movie__count-star">${d.rate}/10<span>
        </span>
      </div>
    </div>
  `
      )
      .join("");
  }
}

export default new PopularMovies();
