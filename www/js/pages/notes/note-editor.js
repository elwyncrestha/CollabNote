import Quill from "quill";
import { QuillConfig, NotesFirebase } from "../../core/config";
import { RouteUtility } from "../../core/utils";
import { RoutesController } from "../../core/controller";
import { ROUTE_CONSTANT } from "../../core/constants";

const { config } = QuillConfig;

const selector = {
  btnAddNote: '#btnAddNote',
  breadcrumbActive: '#breadcrumbActive',
  cardHeaderText: '#cardHeaderText',
  formTextAutoSync: '#formTextAutoSync',
  textNoteTitle: '#textNoteTitle'
}

const isUpdate = !!RouteUtility.getURLParam('id');

let quill;

export function initEditor() {
  quill = new Quill("#editor", config);
  if (isUpdate) {
    configureUpdateUI();
    configureAutoSave();
  } else {
    configureAddListener();
  }
}

function configureUpdateUI() {
  document.querySelector(selector.breadcrumbActive).textContent = 'View';
  document.querySelector(selector.cardHeaderText).textContent = 'View Note';
  document.querySelector(selector.btnAddNote).remove();
  document.querySelector(selector.formTextAutoSync).classList.remove('d-none');
}

function configureAddListener() {
  document.querySelector(selector.btnAddNote).addEventListener('click', saveChanges);
}

function configureAutoSave() {
  const Delta = Quill.import("delta");

  // Store accumulated changes
  var change = new Delta();
  quill.on("text-change", function (delta) {
    change = change.compose(delta);
  });

  // Save periodically
  setInterval(function () {
    if (change.length() > 0) {
      console.log("Saving changes", change);
      /* 
    Send partial changes
    $.post('/your-endpoint', { 
      partial: JSON.stringify(change) 
    });
    
    Send entire document
    $.post('/your-endpoint', { 
      doc: JSON.stringify(quill.getContents())
    });
    */
      change = new Delta();
    }
  }, 5 * 1000);

  // Check for unsaved data
  window.onbeforeunload = function () {
    if (change.length() > 0) {
      return "There are unsaved changes. Are you sure you want to leave?";
    }
  };
}

async function saveChanges() {
  const note = {
    title: document.querySelector(selector.textNoteTitle).value,
    content: JSON.stringify(quill.getContents()),
    createdAt: new Date(),
    updatedAt: isUpdate ? new Date() : null
  };
  try {
    await NotesFirebase.addNote(note);
    RoutesController.to(ROUTE_CONSTANT.NOTE_LIST);
  } catch (e) {

  }
}
