const myLibrary = [];

function Book(title, author, pages, status) {
  //constructor to create books
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

function renderBooks() {
  //Loop though the array to display the books
}