/*IMPORTS */
/*Component stylesheet */
import classes from "./TrendingMovie.module.css";

/*IMPORTS END */


//Component for displaying trending movie in list
const TrendingMovie = props => {

    //Deconstruct props to get movie object
    const { movie } = props;


    /*Content */
    //Declare Date object for release_date property if this exists; otherwise set as null
    //If existing, release year will be displayed in component
    const releaseDate = movie.release_date && movie.release_date.trim().length > 0 ? new Date(movie.release_date) : null;

    //Declare img content
    let img = <></>;

    //If poster_path property exists, img content is set
    if(movie.poster_path) {
        img = <div className={classes.image}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} height={100} alt="movie_poster"/>
        </div>
    }
    
    return (
        <div className={classes.container} onClick={props.onClick}>
            <div className={classes.left}>
                <div className={classes.header}>
                    <h2>{movie.title}</h2>
                    {releaseDate && <span>({releaseDate.getFullYear()})</span>}
                </div>
                <p>{movie.overview}</p>
            </div>
            {img}
        </div>
    )
}

export default TrendingMovie;