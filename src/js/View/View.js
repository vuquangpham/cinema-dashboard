import Toast from "./Toast";

export default class View {
  _data;
  _successMessage = "Task has completely done. Please check it!!!";

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderError();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();

    this._parentElm.insertAdjacentHTML("beforeend", markup);
  }

  _clear() {
    this._parentElm.innerHTML = "";
  }

  _renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg 
        viewBox="0 0 24 24" 
        xmlns="http://www.w3.org/2000/svg"
        class="spinner"
      >
        <path d="M16 16L19 19M18 12H22M8 8L5 5M16 8L19 5M8 16L5 19M2 12H6M12 2V6M12 18V22" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    `;
    this._parentElm.insertAdjacentHTML("beforeend", markup);
  }

  _renderError() {
    new Toast("error", this._errorMessage);
  }

  _renderSuccess() {
    new Toast("success", this._successMessage);
  }
}
