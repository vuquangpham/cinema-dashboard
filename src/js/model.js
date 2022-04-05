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
  const popularMovies = responseList
    .map((d) => d.data)
    .map((movie) => {
      const {
        Poster: image,
        Title: title,
        imdbRating: rate,
        Language: lang,
        Released: released,
        Runtime: fulltime,
        Actors: actor,
      } = movie;

      return {
        image,
        title,
        rate,
        lang,
        released,
        fulltime,
        actor,
      };
    });
  state.popularMovies = popularMovies;
};

export const loadSuggestMovies = async function (query) {
  state.suggestMovies = [];
  const res = await fetchData({ s: query });
  const searchItems = res.Search.map((movie) => {
    const { Poster: image, Title: title, imdbRating: rate, imdbID: id } = movie;

    return {
      image,
      title,
      rate,
      id,
    };
  });
  state.suggestMovies = searchItems;
};

export const getDetailMovie = async function (id) {
  const res = await getJSON({ i: id });
  const {
    Poster: image,
    Title: title,
    imdbRating: rate,
    Language: lang,
    Released: released,
    Runtime: fulltime,
    Actors: actor,
  } = res.data;

  state.detailMovie = {
    image,
    title,
    rate,
    lang,
    released,
    fulltime,
    actor,
  };
};

export const addToBookmark = function (id) {
  const { title, image } = state.popularMovies[id];
  state.bookmarks.push({
    title,
    image,
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
