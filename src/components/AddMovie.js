import React from "react";
import serialize from "form-serialize";
import { Link } from "react-router-dom";
class AddMovie extends React.Component {
  handlerFormSubmit = (e) => {
    e.preventDefault();
    const newMovie = serialize(e.target, { hash: true });
    //    console.log(newMovie)
    this.props.onAddMovie(newMovie);
  };
  render() {
    return (
      <div className='card col-6 mt-2 bg-light'>
        <div className='card-header mt-3 bg-warning text-white'>
          Fill The Form To Add A Movie..
        </div>
        <form className='mt-5' onSubmit={this.handlerFormSubmit}>
          <div className='form-row'>
            <div className='form-group col-md-10'>
              <label htmlFor='inputName'>Name</label>
              <input type='text' className='form-control' name='name' />
            </div>
            <div className='form-group col-md-2'>
              <label htmlFor='inputRating'>Rating</label>
              <input type='text' className='form-control' name='rating' />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='inputImage'>Image URL</label>
              <input type='text' className='form-control' name='imageURL' />
            </div>
          </div>
          <div className='form-row'>
            <div className='form-group col-md-12'>
              <label htmlFor='overviewTextarea'>Overview</label>
              <textarea
                className='form-control'
                name='overview'
                rows='5'
              ></textarea>
            </div>
          </div>
          <input
            type='submit'
            className='btn btn-warning text-white btn-block mb-3'
            value='Add Movie'
          />
        </form>

        <div className='col-12 '>
          <Link to='/' className='btn btn-sm btn-danger btn-block mb-3'>
            Back
          </Link>
        </div>
      </div>
    );
  }
}
export default AddMovie;
