class InputSearch {
  _parentElm = document.querySelector(".search__input");

  _onInput(e) {
    const searchData = encodeURI(e.target.value.trim());
  }

  getQuery() {
    return encodeURI(this._parentElm.value.trim());
  }

  handleInputChange(handler) {
    this._parentElm.addEventListener("input", handler);
  }
}
export default new InputSearch();
