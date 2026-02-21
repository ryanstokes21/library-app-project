const myLibrary = [];

const el = {
  container: document.querySelector('.container'),
  bookBtn: document.querySelector('.add-book'),
  dialog: document.getElementById('add-book-dialog'),
  form: document.querySelector('form'),
  cancelBtn: document.getElementById('cancel-btn'),
}

function Book(title, author, pages, status) {
  //constructor to create books
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

Book.prototype.isRead = function () {
  return this.status ? 'read' : 'not read'; 
}

Book.prototype.toggleRead = function() {
  this.status = !this.status;
}

function addToLibrary(title, author, pages, status) {
  //add the books to the array
  const newBook = new Book(title, author, pages, status)

  myLibrary.push(newBook);
}

function createBookCards(book) {
  //create card structure
  const bookCard = document.createElement('div');
  bookCard.dataset.id = book.id;
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
  bookPages.textContent = `${book.pages} pages`;
  bookCard.appendChild(bookPages);

  const bookStatus = document.createElement('p');
  bookStatus.classList.add('book-status');
  bookStatus.textContent = book.isRead(); //change true/false to read/not read string

  bookStatus.classList.add(book.status ? 'read' : 'not-read')
  bookCard.appendChild(bookStatus);
  
  const deleteBtn = document.createElement('span');
  deleteBtn.classList.add('delete-book');
  deleteBtn.textContent = 'X';
  deleteBtn.dataset.id = book.id;
  bookCard.appendChild(deleteBtn);
  el.container.appendChild(bookCard);
}

function renderBooks() {
  //Loop through the array to display the books
  el.container.innerHTML = '';

  myLibrary.forEach(book => {
    createBookCards(book);
  })
}

el.bookBtn.addEventListener('click', () => {
  el.dialog.showModal();
});

el.cancelBtn.addEventListener('click', () => {
  el.dialog.close();
});

el.form.addEventListener('submit', (e) => {
  e.preventDefault();

  const status = document.getElementById('status');
  const title = document.getElementById('title');
  const author = document.getElementById('author');
  const pages = document.getElementById('pages');

  const titleInput = title.value.trim();
  const authorInput = author.value.trim();
  const pagesInput = Number(pages.value);
  const statusInput = status.checked;
  
  addToLibrary(titleInput, authorInput, pagesInput, statusInput);
  el.dialog.close();
  el.form.reset();
  renderBooks();
})

el.container.addEventListener('click', (e) => {
  if(e.target.classList.contains('book-status')) {
    const bookStatus = e.target;
    const bookCard = bookStatus.closest('.book-card');
    const bookId = bookCard.dataset.id;
    const book = myLibrary.find(b => b.id === bookId)
    
    if(book) {
      book.toggleRead();
      bookStatus.textContent = book.isRead();
      bookStatus.classList.toggle('read', book.status);
      bookStatus.classList.toggle('not-read', !book.status);
    }
  } else if(e.target.classList.contains('delete-book')) {
    const deleteEl = e.target;
    const bookId = deleteEl.dataset.id;
    const index = myLibrary.findIndex(b => b.id === bookId);
    if(index !== -1) {
      myLibrary.splice(index, 1);
    }
    renderBooks();
  }
})