/*IMPORTS */
/*Component stylesheet */
import classes from "./SearchedMovie.module.css";

/*IMPORTS END */

const SearchedMovie = props => {

    //Deconstruct props to retrieve objects
    const { movie, onSelect } = props;


    /*Content */
    //Declare Date object if movie object contains release_date property; otherwise set as null
    //If Date object is successfully declared, release year will be shown
    const releaseDate = movie && movie.release_date && movie.release_date.trim().length > 0 ? 
                            new Date(movie.release_date) : 
                            null;

    return (
        <section className={classes.container} onClick={onSelect}>
            <h3>{movie.title}</h3>
            {releaseDate && <span>Utgivelsesår: {releaseDate.getFullYear()}</span>}
        </section>
    )
}

export default SearchedMovie;