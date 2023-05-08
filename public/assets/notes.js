const titleEl = document.querySelector("#note-title");
const textEl = document.querySelector("#note-text");
const saveBtn = document.querySelector("#save-note");
const newNoteBtn = document.querySelector("#new-note");
const noteList = document.querySelector("#list-tab");

// A function to render the notes
const renderNotes = (notes) => {
  // Clear any existing notes
  noteList.innerHTML = "";

  // Create a new list item for each note
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    const span = document.createElement("span");
    span.textContent = note.title;

    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-danger", "float-end");
    delBtn.textContent = "Delete";

    li.appendChild(span);
    li.appendChild(delBtn);
    noteList.appendChild(li);

    delBtn.addEventListener("click", () => {
      fetch(`/api/notes/${note.id}`, { method: "DELETE" })
        .then(() => li.remove())
        .catch((err) => console.error(err));
    });
  });
};

// A function to get the notes from the server and render them
const getAndRenderNotes = () => {
  fetch("/api/notes")
    .then((res) => res.json())
    .then(renderNotes)
    .catch((err) => console.error(err));
};

// Event listener for the Save Note button
if (saveBtn) {
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const newNote = {
      title: titleEl.value.trim(),
      text: textEl.value.trim(),
    };

    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((note) => {
        titleEl.value = "";
        textEl.value = "";
        getAndRenderNotes();
      })
      .catch((err) => console.error(err));
  });
}

// Event listener for the New Note button
if (newNoteBtn) {
  newNoteBtn.addEventListener("click", () => {
    titleEl.value = "";
    textEl.value = "";
  });
}

// Load the notes when the DOM content has loaded
document.addEventListener("DOMContentLoaded", () => {
  getAndRenderNotes();
});
