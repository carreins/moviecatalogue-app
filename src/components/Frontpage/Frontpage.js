/*IMPORTS */
/*React and React module dependencies*/
import { useState, useEffect } from "react";

/*Custom component */
import TrendingMovie from "./TrendingMovie";
import SelectedMovie from "../SelectedMovie/SelectedMovie";

/*Custom UI component */
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";

/*Custom hooks */
import { useGetSearchAPIForArray } from "../../hooks/http-movie-hooks";

/*Component stylesheet */
import classes from "./Frontpage.module.css";

/*IMPORTS END */


//Component for front page of app; displays a list of trending movies, and a link to search page
const Frontpage = () => {

    /*useState */
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedMovieId, setSelectedMovieId] = useState(0);


    /*Custom hooks */
    const sendRequestForArray = useGetSearchAPIForArray(setError);


    /*Built-in hooks */
    //useEffect method
    useEffect(() => {

        if(isLoading && !error){

            //If isLoading is true (it will be initially) and no errors are found, send request to load trending movies
            sendRequestForArray('trending').then(res => {

                //If found, update states
                setResults(res.results);
                setIsLoading(false);
            });
        }

    }, [isLoading, error, sendRequestForArray])


    /*Content */
    //Declare JSX content object for list container
    let content = <></>

    if(isLoading){

        //If loading, show loading spinner
        content = <LoadingSpinner />
    } else if(error){

        //Else if error is found, show error text
        <p>{error}</p>
    } else if(results && results.length > 0){

        //Else if trending movies are found, map into a list and display 
        content = <ul>
            {results.map((result, index) => 
            <li key={index}>
                <TrendingMovie movie={result} onClick={() => setSelectedMovieId(result.id)}/>
            </li>)}
        </ul>
    }

    return (
        <div className={classes.container}>
            <h1>Velkommen til filmkatalogen!</h1>
            <p>Her kan du finne info om alle filmer du skulle ønske.</p>
            <a href="/search">Søk etter filmer her {"=>"}</a>
            <h3>Populært akkurat nå:</h3>
            <Card className={classes["list-container"]}>
                {content}
            </Card>
            {selectedMovieId > 0 && 
                <Modal onClose={() => setSelectedMovieId(0)}>
                    <SelectedMovie id={selectedMovieId} />
                </Modal>
            }
        </div>
    )
}

export default Frontpage;