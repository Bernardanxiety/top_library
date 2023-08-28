const openFormButton = document.getElementById('openFormBtn');
const addToLibraryBtn = document.getElementById('addToLibraryBtn');
const formDiv = document.querySelector('.form');
const bookAuthor = document.getElementById('author');
const bookTitle = document.getElementById('title');
const booksDiv = document.querySelector('.books');
const libraryArray = [];

function newId() {
  let id = 0;

  const getId = () => id;
  const idUp = () => id++;
  return { getId, idUp };
}

const libraryId = newId();

function NewBook(title, author, id) {
  (this.title = title),
    (this.author = author),
    (this.id = id),
    (this.read = false);
}

NewBook.prototype.readBook = function () {
  this.status = !this.status;
};

function addBookToLibrary() {
  const title = bookTitle.value;
  const author = bookAuthor.value;
  const id = libraryId.getId();
  const book = new NewBook(title, author, id);

  if (author && title) libraryArray.push(book);
  bookTitle.value = '';
  bookAuthor.value = '';
}

openFormButton.addEventListener('click', toggleForm);

addToLibraryBtn.addEventListener('click', e => {
  e.preventDefault();
  addBookToLibrary();
  libraryId.idUp();
  toggleForm();
  displayBooks();
});

function toggleForm() {
  formDiv.classList.contains('hidden')
    ? formDiv.classList.remove('hidden')
    : formDiv.classList.add('hidden');
}

const newEl = element => document.createElement(element);

function displayBooks() {
  libraryArray.forEach(book => {
    const id = book.id;
    const bookCard = newEl('div');
    bookCard.classList.add('book', 'margin-top');
    bookCard.id = `book-${id}`;

    if (!document.getElementById(`book-${id}`)) {
      for (const [key, value] of Object.entries(book)) {
        if (!book.hasOwnProperty(key) || key === 'id') continue;
        const [keyFirstLetter, ...keyRest] = key;
        const newKey = keyFirstLetter.toUpperCase() + keyRest.join('') + ': ';
        if (key === 'read') {
          const div = newEl('div');
          const span = newEl('span');
          const readButton = newEl('button');

          div.setAttribute(
            'style',
            'display: flex; align-items: center; gap: .25rem'
          );

          span.textContent = newKey;

          readButton.classList.add('checkButton', 'checkButton--notRead');
          readButton.setAttribute('data-attribute', '\u{2713}');
          readButton.addEventListener('click', e => {
            const classRead = 'checkButton--read';
            const classNotRead = 'checkButton--notRead';
            book[key] = !book[key];
            if (book[key]) {
              // button.textContent = 'Read';
              readButton.classList.remove(classNotRead);
              readButton.classList.add(classRead);
            } else {
              // button.textContent = 'Not read';
              readButton.classList.remove(classRead);
              readButton.classList.add(classNotRead);
            }
          });

          div.append(span, readButton);
          bookCard.append(div);
          continue;
        }
        const span = newEl('span');
        const p = newEl('p');

        span.textContent = newKey;
        span.classList.add('bold');

        p.append(span, value);

        bookCard.append(p);
      }
      const removeButton = newEl('button');

      removeButton.textContent = 'Remove';
      removeButton.classList.add('button', 'removeButton');
      removeButton.addEventListener('click', e => {
        const index = libraryArray.indexOf(book);
        console.log(index);
        libraryArray.splice(index, 1);
        clearBooksDiv();
        displayBooks();
      });
      bookCard.append(removeButton);
      booksDiv.append(bookCard);
    }
  });
}

function clearBooksDiv() {
  document
    .querySelectorAll('.books > div')
    .forEach(div => booksDiv.removeChild(div));
}

// function displayBooks() {
//   libraryArray.forEach(book => {
//     const id = book.id;
//     if (!document.getElementById(`book-${id}`)) {
//       const bookCard = newEl('div');
//       for (let property in book) {
//         if (!book.hasOwnProperty(property)) {
//           continue;
//         }
//         if (property === 'id') {
//           continue;
//         }
//         if (property === 'read') {
//           const div = newEl('div');
//           const p = newEl('p');
//           const btn = newEl('button');
//           div.setAttribute(
//             'style',
//             `display: flex; gap: .5em; align-items: center;`
//           );
//           bookCard.appendChild(div);
//           div.appendChild(p);
//           p.textContent = property;
//           div.appendChild(btn);
//           btn.textContent = book.read ? '✓' : '✗';
//           btn.addEventListener('click', e => {
//             book.readBook();
//             e.target.textContent = book.read ? '✓' : '✗';
//           });
//           continue;
//         }
//         const p = newEl('p');
//         p.textContent = book[property];
//         bookCard.appendChild(p);
//       }
//       bookCard.className = 'book margin-top';
//       bookCard.id = `book-${id}`;
//       booksDiv.appendChild(bookCard);
//     }
//   });
// }
