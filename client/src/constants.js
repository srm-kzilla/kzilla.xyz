export const API = {
  BASE_URL: "/api/v1",
  SHRINK_URL: "/links",
  FETCH_ANALYTICS: "/analytics/",
  MY_LINKS: "/links/me",
  KZILLA_URL: "kzilla.xyz/",
  ANALYTICS_URL: "kzilla.xyz/analytics/",
};
export const toastSuccess = {
  theme: {
    "--toastBarBackground": "#54a870",
  },
};

export const toastFail = {
  theme: {
    "--toastBarBackground": "#F0634D",
  },
};
// qr functions
export function QRdownload(e) {
  var myDiv = document.getElementById(API.KZILLA_URL + data.shortCode);
  var myImage = myDiv.children[1];
  var hr = document.getElementById(data.shortCode);
  hr.href = myImage.src;
  return false;
}

//Opening and closing the edit and QR modals.

export function showEditor(e) {
  var editor = this.parentElement;
  window.$(editor).find(".kz-modalId").removeClass("d-none");
}

export function showQREditor(e) {
  console.log("OUTSIDE FORMSTRUCTURE");
  var editor = this.parentElement;
  window.$(editor).find(".kz-qr-modalId").removeClass("d-none");
}

export function hideEditor() {
  var editor = document.querySelectorAll(".kz-modalId");
  editor.forEach(function (e) {
    window.$(e).addClass("d-none");
  });
}

export function hideQREditor() {
  var editor = document.querySelectorAll(".kz-qr-modalId");
  editor.forEach(function (e) {
    window.$(e).addClass("d-none");
  });
}
