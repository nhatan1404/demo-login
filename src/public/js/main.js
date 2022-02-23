const apiURL = 'http://localhost:8888';

const postData = (url = apiURL, data = {}) => {
  const option = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  };

  return fetch(url, option);
};

const login = async () => {
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const email = emailField.value;
  const password = passwordField.value;
  const url = `${apiURL}/auth/login`;

  try {
    const response = await postData(url, { email, password });

    if (response.status === 401) {
      displayError('msg-email', 'Sai tài khoản hoặc mật khẩu');
      displayError('msg-password', 'Sai tài khoản hoặc mật khẩu');
      return;
    }

    const { message, statusCode } = await response.json();

    if (statusCode === 200) {
      window.location.href = apiURL;
    } else {
      for (const error of message) {
        displayError(
          'msg-' + error.field,
          error.message[error.message.length - 1],
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};

const register = async () => {
  const fullNameField = document.getElementById('fullName');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const repasswordField = document.getElementById('repassword');
  const fullName = fullNameField.value;
  const email = emailField.value;
  const password = passwordField.value;
  const repassword = repasswordField.value;
  const url = `${apiURL}/auth/register`;

  try {
    const response = await postData(url, {
      fullName,
      email,
      password,
      repassword,
    });
    const { message, statusCode } = await response.json();
    if (statusCode === 400) {
      for (const error of message) {
        displayError(
          'msg-' + error.field,
          error.message[error.message.length - 1],
        );
      }
    }

    if (statusCode === 203) {
      document.getElementById('alert-register').classList.remove('hidden');
    }
  } catch (error) {
    console.error(error);
  }
};

const displayError = (msgId, message) => {
  const msgElement = document.getElementById(msgId);
  msgElement.classList.remove('hidden');
  msgElement.innerText = message;
};

const removeMsgError = (inputId, msgId) => {
  const emailField = document.getElementById(inputId);
  const msgEmail = document.getElementById(msgId);
  const value = emailField.value;

  if (value !== '' && !msgEmail.classList.contains('hidden')) {
    msgEmail.classList.add('hidden');
  }
};
var toggleCollapse = function toggleCollapse(elementId) {
  var show =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var collapseEl = document.getElementById(elementId);

  if (show) {
    collapseEl.classList.remove('hidden');
  } else {
    collapseEl.classList.add('hidden');
  }
};

document.addEventListener('DOMContentLoaded', function () {
  // Toggle target elements using [data-collapse-toggle]
  document
    .querySelectorAll('[data-collapse-toggle]')
    .forEach(function (collapseToggleEl) {
      var collapseId = collapseToggleEl.getAttribute('data-collapse-toggle');
      collapseToggleEl.addEventListener('click', function () {
        toggleCollapse(
          collapseId,
          document.getElementById(collapseId).classList.contains('hidden'),
        );
      });
    });
});
window.toggleCollapse = toggleCollapse;

var toggleModal = function toggleModal(modalId) {
  var show =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var modalEl = document.getElementById(modalId);

  if (show) {
    modalEl.classList.add('flex');
    modalEl.classList.remove('hidden');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('role', 'dialog');
    modalEl.removeAttribute('aria-hidden'); // create backdrop element

    var backdropEl = document.createElement('div');
    backdropEl.setAttribute('modal-backdrop', '');
    backdropEl.classList.add(
      'bg-gray-900',
      'bg-opacity-50',
      'dark:bg-opacity-80',
      'fixed',
      'inset-0',
      'z-40',
    );
    document.querySelector('body').append(backdropEl);
  } else {
    modalEl.classList.add('hidden');
    modalEl.classList.remove('flex');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.removeAttribute('aria-modal');
    modalEl.removeAttribute('role');
    document.querySelector('[modal-backdrop]').remove();
  }
};

window.toggleModal = toggleModal;
document.addEventListener('DOMContentLoaded', function () {
  document
    .querySelectorAll('[data-modal-toggle]')
    .forEach(function (modalToggleEl) {
      var modalId = modalToggleEl.getAttribute('data-modal-toggle');
      var modalEl = document.getElementById(modalId);

      if (modalEl) {
        if (
          !modalEl.hasAttribute('aria-hidden') &&
          !modalEl.hasAttribute('aria-modal')
        ) {
          modalEl.setAttribute('aria-hidden', 'true');
        }

        modalToggleEl.addEventListener('click', function () {
          toggleModal(modalId, modalEl.hasAttribute('aria-hidden', 'true'));
        });
      }
    });
});
