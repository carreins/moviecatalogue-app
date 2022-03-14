/*IMPORTS */
/*React and React module dependencies*/
import { useState, useEffect } from "react";

/*Custom components */
import SelectedMovieImages from "./SelectedMovieImages";
import SelectedMovieVideos from "./SelectedMovieVideos";

/*Custom hooks */
import { useGetSearchAPIForObject } from "../../hooks/http-movie-hooks";

/*Component stylesheet */
import classes from "./SelectedMovie.module.css";

/*Stylesheet import */
import "bootstrap/dist/css/bootstrap.min.css";

/*IMPORTS END */


const SelectedMovie = props => {

    //Deconstruct props to get id for selected movie
    const { id } = props;


    /*useState */   
    const [movie, setMovie] = useState();
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState("images");


    /*Custom hooks */
    const sendRequestForObject = useGetSearchAPIForObject(setError);


    /*Built-in hooks */
    //useEffect method
    useEffect(() => {

        if(id && !movie && !error){

            //If id is found and no attempt to load has been made, send request for details
            sendRequestForObject(id).then(res => {
                if(res){
                    
                    //If result is found, set movie
                    setMovie(res);
                }
            })
        }
    }, [id, movie, error, sendRequestForObject])


    /*Content */
    //Declare runtime variable
    let runtime = undefined;

    if(movie && movie.runtime){

        //Set runtime if property is found on movie object
        let hours = Math.floor(movie.runtime / 60);
        let minutes = movie.runtime % 60;
        if(hours > 0){
            runtime = hours + 't '
        }
        if(minutes > 0){
            runtime = runtime + minutes + 'm'
        }
    }

    //Declare score variable
    let score = undefined;

    if(movie && movie.vote_average){

        //Set score if property vote_average is found on movie object
        score = movie.vote_average * 10;
    }

    //Check if video(s) are available in media section; if yes, possibility to change tab to videos is added
    const videoIsAvailable = movie && movie.videos && movie.videos.results && movie.videos.results.length > 0;

    return (
        <div className={classes.container}>
            {movie && <>
                <h1>{movie.title}</h1>
                <div className={classes.subheader}>
                    {runtime && <span>Spilletid: {runtime}</span>}
                    {score && <span>Score: {score} %</span>}
                </div>
                <div className={classes.media}>
                    {activeTab === "images" && <SelectedMovieImages movie={movie}/>}
                    {activeTab === "video" && videoIsAvailable && <SelectedMovieVideos videos={movie.videos}/>}
                </div>
                {videoIsAvailable &&
                    <div className={classes.tab}>
                        <div className={`${classes["tab-item"]} ${activeTab === "images" ? classes["tab-active"] : ""}`} 
                            onClick={() => setActiveTab("images")}>
                            Bilder
                        </div>
                        <div className={`${classes["tab-item"]} ${activeTab === "video" ? classes["tab-active"] : ""}`} 
                            onClick={() => setActiveTab("video")}>
                            Video
                        </div>
                    </div>
                }
                <p>{movie.overview}</p>
            </>}
            {error && <p>{error}</p>}
        </div>
    )
}

export default SelectedMovie;