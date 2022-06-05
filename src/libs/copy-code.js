import dom from "@left4code/tw-starter/dist/js/dom";
import Toastify from "toastify-js";

(function () {
  "use strict";

  // Copy original code
  dom("body").on("click", ".copy-code", function () {
    const elementId = dom(this).data("target");
    dom(elementId).find("textarea")[0].select();
    dom(elementId).find("textarea")[0].setSelectionRange(0, 99999);
    document.execCommand("copy");

    Toastify({
      text: "Copied!",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      className: "toastify-content",
    }).showToast();
  });
})();
