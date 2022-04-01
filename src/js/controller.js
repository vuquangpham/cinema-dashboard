import * as model from "./model.js";
import Toast from "./View/Toast";
import "../sass/main.scss";
import PopularMovies from "./View/PopularMovies.js";
import InputSearch from "./View/InputSearch.js";
import SuggestItem from "./View/SuggestItem.js";
import { debounce } from "./utility/helpers.js";

const controlPopularMovies = async function () {
  try {
    // fetching movies from API
    await model.loadPopularMovies("avenger");
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
      model.state.suggestMovies = [];
      SuggestItem.hideSuggest();
      return;
    }

    await model.loadSuggestMovies(searchQuery);

    SuggestItem.render(model.state.suggestMovies, true);
    SuggestItem.showSuggest();
  } catch (error) {
    new Toast("error", error.message);
  }
};

const init = function () {
  controlPopularMovies();
  InputSearch.handleInputChange(debounce(controlSearchSuggest, 400));
};

init();
