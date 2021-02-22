import React from "react";
import SearchBar from "./SearchBar";
import MovieList from "./MovieList";
import axios from "axios";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
class App extends React.Component {
  state = {
    movies: [],
    searchQuery: "",
  };

  //ADD MOVIE

  addMovie = async (movie) => {
    await axios.post(`http://localhost:3000/movies/`, movie);
    this.setState((state) => ({
      movies: state.movies.concat([movie]),
    }));
    this.getMovies();
  };

  //EDIT MOVIE

  editMovie = async (id, updatedMovie) => {
    await axios.put(`http://localhost:3000/movies/${id}`, updatedMovie);
    this.getMovies();
  };

  //DELETE MOVIE

  deleteMovie = async (movie) => {
    //FETCH API DELETE
    //     const baseURL =`http://localhost:3000/movies/${movie.id}`
    //    await fetch(baseURL,{
    //         method:"DELETE"
    //     })

    // AXIOS API DELETE
    axios.delete(`http://localhost:3000/movies/${movie.id}`);

    const newMovieList = this.state.movies.filter((m) => m.id !== movie.id);
    // this.setState({
    //     movies:newMovieList
    // })
    this.setState((state) => ({
      movies: newMovieList,
    }));
  };

  //SEARCH MOVIE

  searchMovie = (event) => {
    this.setState({ searchQuery: event.target.value });
  };
  //    async componentDidMount() {
  //         const baseURL ="http://localhost:3000/movies"
  //         const response = await fetch(baseURL)
  //         const data = await response.json()
  //         this.setState({movies:data})
  //     }
  componentDidMount() {
    this.getMovies();
  }
  async getMovies() {
    const baseURL = "http://localhost:3000/movies";
    const response = await axios.get(baseURL);

    this.setState({ movies: response.data });
  }

  render() {
    let filteredMovies = this.state.movies
      .filter((movie) => {
        return (
          movie.name
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1 ||
          movie.overview
            .toLowerCase()
            .indexOf(this.state.searchQuery.toLowerCase()) !== -1
        );
      })
      .sort((a, b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;
      });
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route
              path="/add"
              exact
              render={({ history }) => (
                <AddMovie
                  onAddMovie={(movie) => {
                    this.addMovie(movie);
                    history.push("/");
                  }}
                />
              )}
            ></Route>

            <Route
              path="/"
              exact
              render={() => (
                <React.Fragment>
                  <div className="row ">
                    <div className="col-lg-12">
                      <SearchBar searchMovieProp={this.searchMovie} />
                    </div>
                  </div>

                  <MovieList
                    movies={filteredMovies}
                    deleteMovieProp={this.deleteMovie}
                  />
                </React.Fragment>
              )}
            ></Route>

            <Route
              path="/edit/:id"
              exact
              render={(props) => (
                <EditMovie
                  {...props}
                  onEditMovie={(id, movie) => {
                    this.editMovie(id, movie);
                  }}
                />
              )}
            ></Route>

            <Route path="/edit/:id" component={EditMovie} />
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
