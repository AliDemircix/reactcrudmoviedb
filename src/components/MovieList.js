import React from "react";
import { Link } from "react-router-dom";

const MovieList = (props) => {
  return (
    <div className='row'>
      {props.movies.map((movie, i) => (
        <div className='col-lg-3 col-md-4 col-sm-6' key={i}>
          <div className='card mb-4 shadow-sm'>
            <img
              style={{ maxHeight: "350px" }}
              src={movie.imageURL}
              className='card-img-top'
              alt='test'
            />
            <div className='card-body'>
              <h5 className='card-title d-flex justify-content-between'>
                {movie.name}
                <h2>
                  <span
                    style={{ fontSize: "20px" }}
                    className='badge badge-warning text-light'
                  >
                    {movie.rating}
                  </span>
                </h2>
              </h5>
              <p className='card-text'> {movie.overview.substr(0, 60)}...</p>
              <div className='d-flex justify-content-between align-item-center'>
                <button
                  type='button'
                  className='btn  btn-outline-danger btn-sm my-auto'
                  onClick={() => props.deleteMovieProp(movie)}
                >
                  Delete
                </button>
                <Link
                  to={`/edit/${movie.id}`}
                  type='button'
                  className='btn btn-outline-secondary btn-sm my-auto'
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MovieList;
