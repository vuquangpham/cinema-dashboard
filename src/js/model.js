import { debounce, fetchData, getJSON } from "./utility/helpers";

export const state = {
  popularMovies: [],
  searchQuery: "",
  suggestMovies: [],
  bookmarks: [],
  detailMovie: {},
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
  state.suggestMovies = [];
  const res = await fetchData({ s: query });
  const searchItems = res.Search;
  state.suggestMovies = searchItems;
};

export const getDetailMovie = async function (id) {
  const res = await getJSON({ i: id });
  const data = res.data;
  state.detailMovie = data;
};

export const addToBookmark = function (id) {
  const { Title, Poster } = state.popularMovies[id];
  state.bookmarks.push({
    Title,
    Poster,
  });
  updateBookmark();
};

const updateBookmark = function () {
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const loadBookmarks = function () {
  state.bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
};

export const removeBookmarks = function (id) {
  state.bookmarks.splice(id, 1);
  updateBookmark();
};

const init = () => {
  loadBookmarks();
};

init();
