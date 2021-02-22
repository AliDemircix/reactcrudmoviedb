import React from "react";
import axios from "axios"


class EditMovie extends React.Component {

    state = {
        name: "",
        rating:"",
        overview:"",
        imageURL:""
    }
    async componentDidMount(){

        const id = this.props.match.params.id;
        console.log(id)
        const response = await axios.get(`http://localhost:3000/movies/${id}`);
        const movie = response.data;
        this.setState({
            name: movie.name,
            rating: movie.rating,
            overview: movie.overview,
            imageURL: movie.imageURL
        })
    }
    

    handlerFormSubmit = (e) => {
        e.preventDefault()
        // const name = this.state.name
        // const imageURL = this.state.imageURL
        // const overview = this.state.overview
        // const rating = this.state.overview
      const {name , imageURL , overview , rating } = this.state
      const id = this.props.match.params.id
      const updatedMovie = {
          name,
          imageURL,
          overview,
          rating
      }
      this.props.onEditMovie(id,updatedMovie)
      this.props.history.push("/")
    }
    onInputChange = (e) => {
        // console.log(e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    } 
  render() {
    return (
      <div className="container">
        <form className="mt-5" onSubmit={this.handlerFormSubmit}>
          <input
            className="form-control"
            id="disabledInput"
            type="text"
            placeholder="Fill The Form To Update the Movie.."
            disabled
          />
          <div className="form-row">
            <div className="form-group col-md-10">
              <label htmlFor="inputName">Name</label>
              <input type="text" className="form-control" name="name" value={this.state.name}  onChange={this.onInputChange}/>
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputRating">Rating</label>
              <input type="text" className="form-control" name="rating" value={this.state.rating} onChange={this.onInputChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="inputImage">Image URL</label>
              <input type="text" className="form-control" name="imageURL" value={this.state.imageURL} onChange={this.onInputChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <label htmlFor="overviewTextarea">Overview</label>
              <textarea
                className="form-control"
                name="overview"
                rows="5"
                value={this.state.overview}
                onChange={this.onInputChange}
              ></textarea>
            </div>
          </div>
          <input
            type="submit"
            className="btn btn-success btn-block"
            value="Save&Update"
          />
        </form>
      </div>
    );
  }
}
export default EditMovie;
