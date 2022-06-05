import Chart from "./chart/Main.vue";
import GoogleMapLoader from "./google-map-loader/Main.vue";
import Highlight from "./highlight/Main.vue";
import Litepicker from "./litepicker/Main.vue";
import Tippy from "./tippy/Main.vue";
import TippyContent from "./tippy-content/Main.vue";
import TomSelect from "./tom-select/Main.vue";
import LoadingIcon from "./loading-icon/Main.vue";
import TinySlider from "./tiny-slider/Main.vue";
import ClassicEditor from "./ckeditor/ClassicEditor.vue";
// import BalloonBlockEditor from './ckeditor/BalloonBlockEditor.vue'
// import BalloonEditor from './ckeditor/BalloonEditor.vue'
// import DocumentEditor from './ckeditor/DocumentEditor.vue'
// import InlineEditor from './ckeditor/InlineEditor.vue'
import Dropzone from "./dropzone/Main.vue";
import * as featherIcons from "@zhuowenli/vue-feather-icons";

export default (app) => {
  app.component("Chart", Chart);
  app.component("GoogleMapLoader", GoogleMapLoader);
  app.component("Highlight", Highlight);
  app.component("Litepicker", Litepicker);
  app.component("Tippy", Tippy);
  app.component("TippyContent", TippyContent);
  app.component("TomSelect", TomSelect);
  app.component("LoadingIcon", LoadingIcon);
  app.component("TinySlider", TinySlider);
  app.component("Dropzone", Dropzone);
  app.component("ClassicEditor", ClassicEditor);
  // app.component('BalloonBlockEditor', BalloonBlockEditor)
  // app.component('BalloonEditor', BalloonEditor)
  // app.component('DocumentEditor', DocumentEditor)
  // app.component('InlineEditor', InlineEditor)

  for (const [key, icon] of Object.entries(featherIcons)) {
    icon.props.size.default = "24";
    app.component(key, icon);
  }
};
