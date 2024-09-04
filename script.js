// Elements Selection
const addNoteBtn = document.getElementById('add-note-btn');
const noteModal = document.getElementById('note-modal');
const saveNoteBtn = document.getElementById('save-note-btn');
const noteTextarea = document.getElementById('note-textarea');
const notesContainer = document.getElementById('notes-container');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to show notes
function displayNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.innerHTML = `
            <p>${note}</p>
            <button class="delete-btn" onclick="deleteNote(${index})">&times;</button>
        `;
        notesContainer.appendChild(noteElement);
    });
}

// Function to open the modal
function openModal() {
    noteTextarea.value = '';
    noteModal.style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    noteModal.style.display = 'none';
}

// Function to save the note
function saveNote() {
    const noteText = noteTextarea.value.trim();
    if (noteText) {
        notes.push(noteText);
        localStorage.setItem('notes', JSON.stringify(notes));
        displayNotes();
        closeModal();
    }
}

// Function to delete a note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
}

// Event Listeners
addNoteBtn.addEventListener('click', openModal);
saveNoteBtn.addEventListener('click', saveNote);
window.addEventListener('click', (e) => {
    if (e.target === noteModal) closeModal();
});

// Initial display of notes
displayNotes();
