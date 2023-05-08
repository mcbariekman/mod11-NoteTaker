// Select the elements with the specified IDs and store them in variables
const titleEl = document.querySelector("#note-title");
const textEl = document.querySelector("#note-text");
const saveBtn = document.querySelector("#save-note");
const newNoteBtn = document.querySelector("#new-note");
const noteList = document.querySelector("#list-tab");

// A function to render the notes on the page
const renderNotes = (notes) => {
  // Clear any existing notes from the list
  noteList.innerHTML = "";

  // Loop through each note and create a new list item for it
  notes.forEach((note) => {
    // Create a new list item element
    const li = document.createElement("li");
    li.classList.add("list-group-item");

    // Create a new span element to display the note's title
    const span = document.createElement("span");
    span.textContent = note.title;

    // Create a new delete button element for the note
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-danger", "float-end");
    delBtn.textContent = "Delete";

    // Add the span and delete button to the list item
    li.appendChild(span);
    li.appendChild(delBtn);
    noteList.appendChild(li);

    // Add an event listener to the delete button to delete the note when clicked
    delBtn.addEventListener("click", () => {
      fetch(`/api/notes/${note.id}`, { method: "DELETE" })
        .then(() => li.remove())
        .catch((err) => console.error(err));
    });
  });
};

// A function to get the notes from the server and render them on the page
const getAndRenderNotes = () => {
  fetch("/api/notes")
    .then((res) => res.json())
    .then(renderNotes)
    .catch((err) => console.error(err));
};

// Add an event listener to the Save Note button to save a new note
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Create a new note object with the values from the input fields
  const newNote = {
    title: titleEl.value.trim(),
    text: textEl.value.trim(),
  };

  // Send a POST request to the server to save the new note
  fetch("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newNote),
  })
    .then((res) => res.json())
    .then((note) => {
      // Clear the input fields and render the updated list of notes
      titleEl.value = "";
      textEl.value = "";
      getAndRenderNotes();
    })
    .catch((err) => console.error(err));
});

// Add an event listener to the New Note button to clear the input fields
newNoteBtn.addEventListener("click", () => {
  titleEl.value = "";
  textEl.value = "";
});

// Add an event listener to the DOMContentLoaded event to load the notes when the page loads
document.addEventListener("DOMContentLoaded", () => {
  getAndRenderNotes();
});
