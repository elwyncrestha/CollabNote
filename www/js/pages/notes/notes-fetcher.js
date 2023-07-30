import { NotesFirebase } from '../../core/config';
import { SimpleDataTablesConfig } from '../../core/config';

export async function fetchNotes(idSelector) {
  const response = await NotesFirebase.getNotes();
  const notes = [];
  response.forEach((doc) => {
    const { title, content, createdAt, updatedAt } = doc.data();
    notes.push({
      id: doc.id,
      title,
      content,
      createdAt,
      updatedAt
    });
  });

  const tableBody = document.querySelector(`#${idSelector} tbody`);
  let tableHTML = '';

  notes.forEach((note, i) => {
    tableHTML += `
        <tr>
          <td>${i + 1}</td>
          <td><a href="note-editor.html?id=${note.id}">${note.title}</a></td>
          <td>${note.createdAt?.toDate()?.toLocaleString() || 'N/A'}</td>
          <td>${note.updatedAt?.toDate().toLocaleString() || 'N/A'}</td>
        </tr>
      `;
  });

  tableBody.innerHTML = tableHTML;
  SimpleDataTablesConfig.initSimpleDataTables(idSelector);
}
