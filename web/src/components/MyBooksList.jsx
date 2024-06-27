import PropTypes from 'prop-types';
import MyBook from './MyBook';

function MyBooksList({ myBooks }) {
  return (
    <section className="myBooksSection">
      <ul className="myBooksSection__list">
        {myBooks.map((myBook) => {
          return <MyBook key={myBook.id} myBookData={myBook} />;
        })}
      </ul>
    </section>
  );
}

MyBooksList.propTypes = {
  myBooks: PropTypes.array,
};
export default MyBooksList;
