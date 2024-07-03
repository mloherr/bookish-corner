import PropTypes from 'prop-types';
import BookComponent from './BookComponent';

function BooksList({ books, myBooks, isAuthenticated }) {
  return (
    <section className="booksSection">
      <ul className="booksSection__list">
        {books.map((book) => {
          return (
            <BookComponent
              key={book.id}
              bookData={book}
              myBooks={myBooks}
              isAuthenticated={isAuthenticated}
            />
          );
        })}
      </ul>
    </section>
  );
}

BooksList.propTypes = {
  books: PropTypes.array,
  myBooks: PropTypes.array,
  isAuthenticated: PropTypes.bool,
};
export default BooksList;
