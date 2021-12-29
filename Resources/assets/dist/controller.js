import { Controller } from '@hotwired/stimulus';

class default_1 extends Controller {
    connect() {
        this.clear();
        this.previewClearButtonTarget.addEventListener('click', () => this.clear());
        this.inputTarget.addEventListener('change', (event) => this.onInputChange(event));
        this._dispatchEvent('dropzone:connect');
    }
    clear() {
        this.inputTarget.value = '';
        this.inputTarget.style.display = 'block';
        this.placeholderTarget.style.display = 'block';
        this.previewTarget.style.display = 'none';
        this.previewImageTarget.style.display = 'none';
        this.previewImageTarget.style.backgroundImage = 'none';
        this.previewFilenameTarget.textContent = '';
        this._dispatchEvent('dropzone:clear');
    }
    onInputChange(event) {
        const fileList = event.target.files;
        var htmlString = '';
        for (let i = 0, numFiles = fileList.length; i < numFiles; i++) {
            var file = fileList[i];
            if (typeof file === 'undefined') {
                continue;
            }
            htmlString = htmlString + '<li>'+file.name+'</li>';
            this._dispatchEvent('dropzone:change', file);
        }
        this.inputTarget.style.display = 'none';
        this.placeholderTarget.style.display = 'none';
        this.previewFilenameTarget.innerHTML = '<ol>'+htmlString+'</ol>';
        this.previewTarget.style.display = 'flex';
        this.previewImageTarget.style.display = 'none';

    }
    _populateImagePreview(file) {
        if (typeof FileReader === 'undefined') {
            return;
        }
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            this.previewImageTarget.style.display = 'block';
            this.previewImageTarget.style.backgroundImage = 'url("' + event.target.result + '")';
        });
        reader.readAsDataURL(file);
    }
    _dispatchEvent(name, payload) {
        this.element.dispatchEvent(new CustomEvent(name, { detail: payload }));
    }
}
default_1.targets = ['input', 'placeholder', 'preview', 'previewClearButton', 'previewFilename', 'previewImage'];

export { default_1 as default };
