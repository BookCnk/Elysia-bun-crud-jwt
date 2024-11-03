import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");
const query = db.query("select * from books;");

const getBooks = () => {
  try {
    const query = db.query("select * from books;");
    return query.all();
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

const getBook = (id: number) => {
  try {
    const query = db.query("select * from books where id = $id");
    return query.get(id);
  } catch (error) {
    console.log("err", error);
  }
};

const createBook = (book: any) => {
  try {
    const query =
      db.query(`INSERT INTO books (title, author, genre, isbn, publisher, published_date, pages)
     VALUES ($title, $author, $genre, $isbn, $publisher, $published_date, $pages)`);
    query.run({
      $title: book.title,
      $author: book.author,
      $genre: book.genre,
      $isbn: book.isbn,
      $publisher: book.publisher,
      $published_date: book.published_date,
      $pages: book.pages,
    });
  } catch (error) {
    console.log("err", error);
  }
};

const updatedBook = (id: number, book: any) => {
  try {
    const query = db.prepare(`UPDATE books 
      SET title = $title, 
          author = $author, 
          genre = $genre, 
          isbn = $isbn, 
          publisher = $publisher, 
          published_date = $published_date, 
          pages = $pages 
          WHERE id = $id`);
    query.run({
      $title: book.title,
      $author: book.author,
      $genre: book.genre,
      $isbn: book.isbn,
      $publisher: book.publisher,
      $published_date: book.published_date,
      $pages: book.pages,
    });
  } catch (error) {
    console.log("err", error);
  }
};

const deleteBook = (id: number) => {
  try {
    const query = db.query(`delete from books where id = $id`);
    query.run(id);
  } catch (error) {
    console.log("err", error);
  }
};

console.log(getBooks());
console.log("--");
console.log(getBook(1));
console.log(deleteBook(5));
// console.log(
//   createBook({
//     title: "The Catcher in the Rye",
//     author: "J.D. Salinger",
//     genre: "Fiction",
//     isbn: "9780316769488",
//     publisher: "Little, Brown and Company",
//     published_date: "1951-07-16",
//     pages: 277,
//   })
// );

// console.log(query.get());
