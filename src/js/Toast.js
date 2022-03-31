export const createToastMessage = function ({
  type = "success",
  message = "",
  duration = 3000,
}) {
  const toastBox = document.querySelector(".toast-box");

  const toast =
    type === "success"
      ? generateSuccessMarkup(message)
      : generateErrorMarkup(message);

  toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${
    duration / 1000
  }s forwards`;

  toastBox.appendChild(toast);

  const autoRemoveToast = setTimeout(() => {
    if (autoRemoveToast) {
      toastBox.removeChild(toast);
    }
  }, duration + 1000);

  toast.addEventListener("click", (e) => {
    const closeBtn = e.target.closest(".toast__close");
    if (!closeBtn) return;
    toastBox.removeChild(toast);
    clearTimeout(autoRemoveToast);
  });
};

const generateSuccessMarkup = (message) => {
  const toast = document.createElement("div");
  toast.classList.add("toast", "toast--success");
  toast.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" class="toast__icon" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
  </svg>
  <div class="toast__message">
    <div class="toast__title">Success</div>
    <div class="toast__msg">${message}</div>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" class="toast__close" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg>
  `;
  return toast;
};

const generateErrorMarkup = (message) => {
  const toast = document.createElement("div");
  toast.classList.add("toast", "toast--error");
  toast.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="toast__icon" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
        <div class="toast__message">
          <div class="toast__title">Error</div>
          <div class="toast__msg">${message}</div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="toast__close" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
  `;
  return toast;
};
