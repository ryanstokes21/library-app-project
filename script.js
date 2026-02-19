const myLibrary = [];

const el = {
  container: document.querySelector('.container'),
  bookBtn: document.querySelector('.add-book'),
}

function Book(title, author, pages, status) {
  //constructor to create books
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;

  return { title, author, pages, status }
}

function addToLibrary(title, author, pages, status) {
  //add the books to the array
  const newBook = new Book(title, author, pages, status)

  myLibrary.push(newBook);
}

addToLibrary('Atomic Habits', 'James Clear', '320 pages', 'not read');

addToLibrary('Rich Dad Poor Dad', 'Robert T. Kiyosaki', '194 pages', 'not read');

function createBookCards(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');

  const bookTitle = document.createElement('h3');
  bookTitle.classList.add('book-title');
  bookTitle.textContent = book.title;
  bookCard.appendChild(bookTitle);

  const bookAuthor = document.createElement('p');
  bookAuthor.classList.add('book-author');
  bookAuthor.textContent = book.author;
  bookCard.appendChild(bookAuthor);

  const bookPages = document.createElement('p');
  bookPages.classList.add('book-pages')
  bookPages.textContent = book.pages;
  bookCard.appendChild(bookPages);

  const bookStatus = document.createElement('p');
  bookStatus.classList.add('book-status');
  bookStatus.textContent = book.status;
  bookCard.appendChild(bookStatus);

  el.container.appendChild(bookCard);
}

function renderBooks() {
  //Loop though the array to display the books
  myLibrary.forEach(book => {
    createBookCards(book);
  })
}

renderBooks();