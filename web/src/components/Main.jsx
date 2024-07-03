import PropTypes from 'prop-types';
import BooksList from './BooksList';

function Main({ books, myBooks, isAuthenticated }) {
  return (
    <main className="main">
      <BooksList
        books={books}
        myBooks={myBooks}
        isAuthenticated={isAuthenticated}
      />
    </main>
  );
}

Main.propTypes = {
  books: PropTypes.array,
  myBooks: PropTypes.array,
  isAuthenticated: PropTypes.bool,
};

export default Main;
