import * as model from "./model.js";
import Toast from "./View/Toast";
import "../sass/main.scss";
import PopularMovies from "./View/PopularMovies.js";
import InputSearch from "./View/InputSearch.js";
import SuggestItem from "./View/SuggestItem.js";
import { debounce } from "./utility/helpers.js";
import Bookmarks from "./View/Bookmarks.js";
import DetailMovie from "./View/DetailMovie.js";

const controlPopularMovies = async function () {
  try {
    // fetching movies from API
    await model.loadPopularMovies("captain");
    // render movies
    PopularMovies.render(model.state.popularMovies, true);
  } catch (error) {
    new Toast("error", error.message);
  }
};

const controlSearchSuggest = async function () {
  try {
    const searchQuery = InputSearch.getQuery();

    if (!searchQuery) {
      SuggestItem.hideSuggest();
      return;
    }
    SuggestItem._renderSpinner();
    await model.loadSuggestMovies(searchQuery);

    // SuggestItem.render(model.state.suggestMovies, true);
    SuggestItem.showSuggest();
  } catch (error) {
    new Toast("error", error.message);
    SuggestItem.hideSuggest();
  }
};

const controlBookmark = function () {
  Bookmarks.render(model.state.bookmarks, true, false);
};

const controlAddToBookmark = (id) => {
  model.addToBookmark(id);
  Bookmarks.render(model.state.bookmarks, true, false);
};

const controlRemoveBookMark = (id) => {
  model.removeBookmarks(id);
  Bookmarks.render(model.state.bookmarks, true, false);
};

const controlSuggestFocus = () => {
  if (!model.state.suggestMovies.length) return;
  SuggestItem.showSuggest();
};

const controlSuggestFocusOut = () => {
  SuggestItem.hideSuggest();
};

const controlShowDetailMovie = (id) => {
  DetailMovie.render(model.state.popularMovies[id]);
};

const controlShowDetailSuggestMovie = async (id) => {
  const { imdbID } = model.state.suggestMovies[id];
  DetailMovie.showSpinner();
  await model.getDetailMovie(imdbID);
  DetailMovie.render(model.state.detailMovie);
};

const init = function () {
  controlPopularMovies();
  InputSearch.handleInputChange(debounce(controlSearchSuggest, 400));
  PopularMovies.handleAddToBookmark(controlAddToBookmark);
  PopularMovies.handleShowDetail(controlShowDetailMovie);

  Bookmarks.handleRender(controlBookmark);
  Bookmarks.handleRemoveBookmark(controlRemoveBookMark);

  InputSearch.handleInFocus(controlSuggestFocus);
  // BUG
  // InputSearch.handleOutFocus(controlSuggestFocusOut);

  SuggestItem.handleShowSuggestMovie(controlShowDetailSuggestMovie);

  DetailMovie.handleCloseDetailMovie();
};

init();
