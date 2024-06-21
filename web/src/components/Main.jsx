import PropTypes from 'prop-types';
import BooksList from './BooksList';

function Main({ books }) {
  return (
    <main>
      <BooksList books={books} />
    </main>
  );
}

Main.propTypes = {
  books: PropTypes.array,
};

export default Main;
