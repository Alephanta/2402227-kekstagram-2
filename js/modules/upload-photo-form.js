import {isEscapeKey} from './utils.js';
import { resetValidator } from './validate-form.js';
import { textHashtagsInput, textCommentInput } from './validate-form.js';

const imageUploadForm = document.querySelector('.img-upload__form');
const uploadFileControl = imageUploadForm.querySelector('#upload-file');
const imageUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
const imageUploadCancelButton = imageUploadOverlay.querySelector('#upload-cancel');

// Закрытие модального окна -------------------------------------------------------------------
const onImageUploadCancelButtonClick = () => {
  closeUploadModal();
  resetValidator();
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();

    if(document.activeElement === textHashtagsInput || document.activeElement === textCommentInput) {
      evt.stopPropagation();
    } else {
      closeUploadModal();
      resetValidator();
    }
  }
};

function closeUploadModal () {
  imageUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  imageUploadCancelButton.removeEventListener('click', onImageUploadCancelButtonClick);
  uploadFileControl.value = '';
}

// Начало загрузки файла и открытие модального окна -------------------------------------------
const initUploadModal = () => {
  uploadFileControl.addEventListener('change', () => {
    imageUploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    imageUploadCancelButton.addEventListener('click', onImageUploadCancelButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

export { initUploadModal };
