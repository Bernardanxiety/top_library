const libraryArray = [];

function newId() {
  let id = 0;

  const getId = () => counter;
  const idUp = () => counter++;
  return { getId, idUp };
}

const libraryId = newId();

function NewBook(title, author, id) {
  (this.title = title), (this.author = author), (this.id = id);
}

function addBookToLibrary() {
  const title = prompt('Title of the book: ');
  const author = prompt('Author of the book: ');
  const id = libraryId.getId();
  const book = new NewBook(title, author, id);

  libraryArray.push(book);
}
