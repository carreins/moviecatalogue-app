/*IMPORTS */
/*React and React module dependencies*/
import { useRef, useState, useEffect, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

/*Custom components */
import SearchedMovie from "./SearchedMovie";
import SelectedMovie from "../SelectedMovie/SelectedMovie";
import SearchInput from "./SearchInput";

/*Custom UI components */
import LoadingSpinner from "../UI/LoadingSpinner";
import Modal from "../UI/Modal";

/*Custom hooks */
import { useGetSearchAPIForArray } from "../../hooks/http-movie-hooks";
import { useCountdownTimer } from "../../hooks/helper-hooks";

/*Search context */
import { SearchContext } from "../../storage/search-context";

/*Component stylesheet */
import classes from "./SearchMovies.module.css";

/*IMPORTS END */

const SearchMovies = () => {

    /*useRef */
    const searchInputRef = useRef();


    /*useNavigate */
    const navigate = useNavigate();


    /*useState */
    const [error, setError] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(0);


    /*Custom hooks */
    //Declare objects from reducer external function; used to maintain state of search results
    //Deconstruct reducer state to retireve properties
    //  - searchResults: array with currently showed results, based on search and filter
    //  - isLoading: boolean indicating whether results are loading
    const { searchResults, isLoading, onSearch } = useContext(SearchContext);

    const sendSearchRequest = useGetSearchAPIForArray(setError);
    const { startOrResetTimer, stopAndClearTimer, isComplete } = useCountdownTimer(2);


    /*Functions */
    //changeHandler: function which handles changes made in search input
    const changeHandler = value => {

        //For any change, remove previous error if exists, and reset search results
        setError(prev => null);

        const loading = value.trim().length >= 3;
        onSearch([], loading);

        //If search input is empty, interrupt search
        if(!loading){
            stopAndClearTimer();
            return;
        }

        //Otherwise, start search timer
        startOrResetTimer();  
    }

    //handleSearch: function to handle the searching based on input value
    const handleSearch = useCallback(async () => {

        //Get current value of input through ref variable
        const curValue = searchInputRef.current.value;

        //Search for movies which contains search string
        let response = await sendSearchRequest('search', `query=${curValue}`);   

        if(response){
            
            //If results are found, dispatch to state
            onSearch(response, false);
        }
        
    }, [sendSearchRequest, onSearch]);


    /*Built-in hooks */
    //useEffect method
    useEffect(() => {
        if(isLoading) {

            //If yes, check if countdown has reached 0 and interval exists
            if(isComplete){

                //If yes, clear timer and execute search
                stopAndClearTimer();
                handleSearch();
            } 
        }

    }, [isLoading, isComplete, stopAndClearTimer, handleSearch]);


    /*Content */
    //Declare JSX content variable
    let listContent = <></>
    if(error){

        //If error is found, display error text
        listContent = <p>{error}</p>
    } else if(isLoading) {

        //If loading, display loading spinner
        listContent = <LoadingSpinner/>
    } else if(searchResults && searchResults.length > 0){

        //If search results are found, map to list and display
        listContent = <ul>
            {searchResults.map((searchRes, index) => {
                return <li key={index}><SearchedMovie movie={searchRes} onSelect={() => setSelectedMovieId(searchRes.id)}/></li>
            })}
        </ul>
    } 

    return (
        <div className={classes.container}>
            <h1>Søk</h1>
            <p>Her kan du søke etter filmer.</p>
            <div className={classes.links}>
                <button className={classes.links} onClick={() => navigate("/")}>{'<='} Tilbake til forside</button>
            </div>
            <SearchInput onChange={changeHandler} ref={searchInputRef} />
            {listContent}
            {selectedMovieId > 0 && 
                <Modal onClose={() => setSelectedMovieId(0)}>
                    <SelectedMovie id={selectedMovieId} />
                </Modal>
            }
        </div>
    )
}

export default SearchMovies;