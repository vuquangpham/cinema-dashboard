import { debounce, fetchData, getJSON } from "./utility/helpers";

export const state = {
  popularMovies: [],
  searchQuery: "",
  suggestMovies: [],
};

export const loadPopularMovies = async function (query) {
  const res = await fetchData({ s: query });
  const data = res.Search;

  // Generate id of each movies
  const idMoviesList = data
    .map((m) => m.imdbID)
    .map((id) => getJSON({ i: id }));

  const responseList = await Promise.all(idMoviesList);
  const popularMovies = responseList.map((d) => d.data);
  state.popularMovies = popularMovies;
};

export const loadSuggestMovies = async function (query) {
  const res = await fetchData({ s: query });
  const searchItems = res.Search;
  state.suggestMovies = searchItems;
};
