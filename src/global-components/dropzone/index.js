import Dropzone from 'dropzone'

const init = (el, props) => {
    Dropzone.autoDiscover = false
    el.dropzone = new Dropzone(el, props.options)
    el.dropzone.on("complete", function (file) {
        if (this.getUploadingFiles().length === 0 && this.getQueuedFiles().length === 0) {
            const event = new Event('sending', file);
            el.dispatchEvent(event);
        }
    });
}

export {init}
