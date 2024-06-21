import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faHeart } from '@fortawesome/free-solid-svg-icons';

function BookComponent({ bookData }) {
  return (
    <li className="bookData">
      <figure className="bookData__cover">
        <img src={bookData.image} alt="" />
      </figure>
      <h2 className="bookData__title">{bookData.title}</h2>
      <h3 className="bookData__author">{bookData.author}</h3>
      <p className="bookData__genre">{bookData.genre}</p>
      <div className="bookData__isFavourite">
        {bookData.isFavorite}
        <FontAwesomeIcon
          icon={faHeart}
          className="bookData__isFavourite--icon"
          size="lg"
          style={{ color: 'white', position: 'relative', right: '1.13rem' }}
        />
      </div>
    </li>
  );
}

BookComponent.propTypes = {
  bookData: PropTypes.object,
};

export default BookComponent;
