import PropTypes from 'prop-types';
import BookComponent from './BookComponent';

function BooksList({ books }) {
  return (
    <section className="booksSection">
      <ul className="booksSection__list">
        {books.map((book) => {
          return <BookComponent key={book.id} bookData={book} />;
        })}
      </ul>
    </section>
  );
}

BooksList.propTypes = {
  books: PropTypes.array,
};
export default BooksList;
