import * as model from "./model.js";
import Toast from "./View/Toast";
import "../sass/main.scss";
import PopularMovies from "./View/PopularMovies.js";
import InputSearch from "./View/InputSearch.js";
import SuggestItem from "./View/SuggestItem.js";
import { debounce } from "./utility/helpers.js";
import Bookmarks from "./View/Bookmarks.js";
import DetailMovie from "./View/DetailMovie.js";
import ExpandButton from "./View/ExpandButton.js";

const controlPopularMovies = async function () {
  try {
    PopularMovies._renderSpinner();
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

    SuggestItem.render(model.state.suggestMovies, true);
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
  try {
    model.addToBookmark(id);
    Bookmarks.render(model.state.bookmarks, true, false);
    new Toast("success", "Bookmarked added successfully !!!");
  } catch (error) {
    new Toast("error", error.message);
  }
};

const controlRemoveBookMark = (id) => {
  model.removeBookmarks(id);
  Bookmarks.render(model.state.bookmarks, true, false);
  new Toast("success", "Bookmarked removed successfully !!!");
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

const controlShowDetailSuggestMovie = async (idx) => {
  const { id } = model.state.suggestMovies[idx];
  DetailMovie.showSpinner();
  await model.getDetailMovie(id);
  DetailMovie.render(model.state.detailMovie);
};

const init = function () {
  PopularMovies.handlePageLoad(controlPopularMovies);
  InputSearch.handleInputChange(debounce(controlSearchSuggest, 400));
  PopularMovies.handleAddToBookmark(controlAddToBookmark);
  PopularMovies.handleShowDetail(controlShowDetailMovie);

  Bookmarks.handleRender(controlBookmark);
  Bookmarks.handleRemoveBookmark(controlRemoveBookMark);

  InputSearch.handleInFocus(controlSuggestFocus);
  // // BUG
  // InputSearch.handleOutFocus(controlSuggestFocusOut);

  SuggestItem.handleShowSuggestMovie(controlShowDetailSuggestMovie);

  DetailMovie.handleCloseDetailMovie();
  ExpandButton.handleExpandTab();
};

init();
