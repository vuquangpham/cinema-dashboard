import View from "./View";

class DetailMovie extends View {
  _parentElm = document.querySelector(".detail");

  handleCloseDetailMovie(handler) {
    this._parentElm.addEventListener(
      "click",
      function (e) {
        const btnRemove =
          e.target.closest(".detail-movie__close") ||
          e.target.closest(".detail__overlay");
        if (!btnRemove) return;
        this._clear();
      }.bind(this)
    );
  }

  showSpinner() {
    const markup = `
    <div class="detail__overlay"></div>
    <div class="detail-movie active-spinner">
    <div class="spinner">
      <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        class="spinner"
      >
        <path d="M16 16L19 19M18 12H22M8 8L5 5M16 8L19 5M8 16L5 19M2 12H6M12 2V6M12 18V22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    </div>
    `;

    this._parentElm.insertAdjacentHTML("beforeend", markup);
  }

  _generateMarkup() {
    return `
    <div class="detail__overlay"></div>
    <div class="detail-movie">
      <div class="detail-movie__img">
        <img
          src="${this._data.image}"
          alt="Detail movie${this._data.title}">
      </div>
      <div class="detail-movie__details">
        <h1 class="detail-movie__title">${this._data.title}</h1>
        <p class="detail-movie__lan">Language: <span>${this._data.lang}</span></p>
        <p class="detail-movie__released">
          Released: <span>${this._data.released}</span>
        </p>
        <span class="movie__star">
          <span>Rated: </span>
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
          <span class="movie__count-star">${this._data.rate} / 10</span>
        </span>
        <p class="detail-movie__fulltime">Runtime: <span>${this._data.fulltime}</span></p>
        <p class="detail-movie__actors">
          Actors: <span>${this._data.actor}</span>
        </p>
      </div>
      <div class="detail-movie__close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class=""
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>
    `;
  }
}

export default new DetailMovie();
