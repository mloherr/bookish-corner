import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function BookDetail(bookDetailData) {
  console.log('bookDetailData', bookDetailData);
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    if (bookDetailData) {
      console.log('Cargando datos:', bookDetailData);
      setBookData(bookDetailData);
    }
  }, [bookDetailData]);

  console.log('bookData', bookData);
  return (
    <section className="sectionDetailData">
      <div className="sectionDetailData__returnHome">
        <Link to={'/'} className="sectionDetailData__returnHome--link">
          Volver a Inicio
        </Link>
      </div>
      <div className="sectionDetailData__containerData">
        <figure className="sectionDetailData__containerData--image">
          <img src={bookData?.image} alt={bookData?.title} />
        </figure>
        <div className="sectionDetailData__containerData--info">
          <h4>{bookData?.title}</h4>
          <p>Sinopsis: {bookData?.resume}</p>
          <p>Páginas: {bookData?.pages}</p>
          <p>Idioma: {bookData?.language}</p>
        </div>
      </div>
    </section>
  );
}

export default BookDetail;
