class ExpandButton {
  _parentElm = document.querySelector(".cinema__navigation");

  handleExpandTab(handler) {
    this._parentElm.addEventListener(
      "click",
      function (e) {
        this._parentElm.classList.toggle("active");
      }.bind(this)
    );
  }
}

export default new ExpandButton();
