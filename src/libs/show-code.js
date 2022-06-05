import dom from "@left4code/tw-starter/dist/js/dom";

(function () {
  "use strict";

  // Show code or preview
  dom("body").on("change", ".show-code", function () {
    const elementId = dom(this).data("target");
    if (dom(this).is(":checked")) {
      dom(elementId).find(".preview").hide();
      dom(elementId).find(".source-code").fadeIn();
    } else {
      dom(elementId).find(".preview").fadeIn();
      dom(elementId).find(".source-code").hide();
    }
  });
})();
