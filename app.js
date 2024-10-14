const myLibrary = [];
const form = document.getElementById("book-form");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  };
}

function addBookToLibrary(book) {
  const newBook = myLibrary.push(book);
  return newBook;
}

function displayBooks() {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  if (myLibrary.length === 0) {
    const noBooksMessage = document.createElement("p");
    noBooksMessage.classList.add("message");
    noBooksMessage.textContent = "No books added yet.";
    bookList.appendChild(noBooksMessage);
    return;
  }
  myLibrary.forEach((book, index) => {
    const newBook = document.createElement("li");
    newBook.classList.add("book");
    newBook.textContent = book.info();
    //   delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove";
    deleteButton.addEventListener("click", () => {
      removeBook(index);
    });
    newBook.appendChild(deleteButton);
    bookList.appendChild(newBook);
  });
}

function removeBook(index) {
  myLibrary.splice(index, 1);
  displayBooks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value;
  const book = new Book(title, author, pages, read);
  if (title && author && pages && read) {
    addBookToLibrary(book);
    displayBooks();
    form.reset();
  } else {
    const bookList = document.getElementById("book-form");
    const errorMessage = document.querySelector(".error-message");
    if (!errorMessage) {
      const paragraph = document.createElement("p");
      paragraph.classList.add("error-message");
      paragraph.textContent = "Please enter something.";
      paragraph.style = "color:red; margin:1rem; fontSize: 1.4rem;";
      bookList.append(paragraph);
    }
  }
  if (title && author && pages && read) {
    const errorMessage = document.querySelector(".error-message");
    if (errorMessage) {
      errorMessage.remove();
    }
  }
});

displayBooks()
