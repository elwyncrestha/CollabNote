import Quill from 'quill';
import { QuillConfig, NotesFirebase } from '../../core/config';
import { RouteUtility } from '../../core/utils';
import { RoutesController } from '../../core/controller';
import { ROUTE_CONSTANT } from '../../core/constants';

const { config } = QuillConfig;

const selector = {
  btnAddNote: '#btnAddNote',
  breadcrumbActive: '#breadcrumbActive',
  cardHeaderText: '#cardHeaderText',
  formTextAutoSync: '#formTextAutoSync',
  textNoteTitle: '#textNoteTitle',
  spanLastSaved: '#spanLastSaved',
};

const id = RouteUtility.getURLParam('id');
let updatingNote = {
  title: null,
  content: null,
  createdAt: null,
  updatedAt: null,
};
const isUpdate = !!id;

let quill;

/**
 * [Configuration - Quill Rich Text Editor](https://quilljs.com/docs/configuration/)
 */
export async function initEditor() {
  quill = new Quill('#editor', config);
  if (isUpdate) {
    await configureUpdateUI();
    configureAutoSave();
  } else {
    configureAddListener();
  }
}

async function configureUpdateUI() {
  document.querySelector(selector.breadcrumbActive).textContent = 'View';
  document.querySelector(selector.cardHeaderText).textContent = 'View Note';
  document.querySelector(selector.btnAddNote).remove();
  document.querySelector(selector.formTextAutoSync).classList.remove('d-none');

  const response = await NotesFirebase.getNote(id)
  if (response.exists()) {
    updatingNote = response.data();
    updatingNote = { ...updatingNote, createdAt: updatingNote.createdAt.toDate(), updatedAt: updatingNote.updatedAt?.toDate() };
    document.querySelector(selector.textNoteTitle).value = updatingNote.title;
    quill.updateContents(JSON.parse(updatingNote.content));
    document.querySelector(selector.spanLastSaved).textContent = updatingNote.updatedAt?.toLocaleString() ?? updatingNote.createdAt?.toLocaleString();
  }
}

function configureAddListener() {
  document
    .querySelector(selector.btnAddNote)
    .addEventListener('click', saveChanges);
}

/**
 * [Interactive Playground - Quill Rich Text Editor](https://quilljs.com/playground/#autosave)
 */
function configureAutoSave() {
  const Delta = Quill.import('delta');

  // Store accumulated changes
  var change = new Delta();
  quill.on('text-change', function (delta) {
    change = change.compose(delta);
  });

  // Save periodically
  setInterval(function () {
    if (change.length() > 0) {
      saveChanges();
      change = new Delta();
    }
  }, 5 * 1000);

  // Check for unsaved data
  window.onbeforeunload = function () {
    if (change.length() > 0) {
      return 'There are unsaved changes. Are you sure you want to leave?';
    }
  };
}

async function saveChanges() {
  const now = new Date();
  const note = {
    title: document.querySelector(selector.textNoteTitle).value,
    content: JSON.stringify(quill.getContents()),
    createdAt: isUpdate ? updatingNote.createdAt : now,
    updatedAt: isUpdate ? now : null,
  };
  try {
    if (isUpdate) {
      await NotesFirebase.updateNote(id, note);
      document.querySelector(selector.spanLastSaved).textContent = now.toLocaleString();
    } else {
      await NotesFirebase.addNote(note);
      RoutesController.to(ROUTE_CONSTANT.NOTE_LIST);
    }
  } catch (e) {}
}
