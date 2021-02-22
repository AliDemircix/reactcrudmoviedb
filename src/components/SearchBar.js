import React from "react";
import { Link } from "react-router-dom";

class SearchBar extends React.Component {
  formSubmit = (e) => {
    e.preventDefault();
  };
  render() {
    return (
      <form className='mt-5' onSubmit={this.formSubmit}>
        <div className='form row mb-5'>
          <div className='col-9'>
            <input
              type='text'
              onChange={this.props.searchMovieProp}
              className='form-control'
              placeholder='Search'
            ></input>
          </div>
          <div className='col-2'>
            <Link to='/add' className='btn btn-sm btn-danger'>
              Add Movie
            </Link>
          </div>
        </div>
      </form>
    );
  }
}
export default SearchBar;
