/*
    SEARCH CONTEXT
    React context for use in search page; maintains filter for search page, as well as search reducer functionality.
*/


/*IMPORTS */
/*React module dependencies */
import React from "react";
import { useState, useEffect, useCallback } from "react";

/*Custom hooks */
import { useGetGenresFromAPI } from "../hooks/http-additional-hooks";
import useSearchReducer from "../reducer/search-reducer";

/*IMPORTS END */


//Declare && export context object
export const SearchContext = React.createContext({
    filter: {
        sort: {
            type: undefined,
            direction: undefined
        },
        years: [],
        genres: [],
    },
    searchResults: [],
    isLoading: Boolean,
    onFilter: () => {},
    onSearch: () => {}
})


//Export context provider object
export const SearchContextProvider = props => {

    /*useState */
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filter, setFilter] = useState();


    /*Custom hooks */
    //Declare objects from reducer external function; used to maintain state of search results
    const [searchState, searchDispatcher] = useSearchReducer();

    //Use function to fetch genres from movie API
    const sendGenreRequest = useGetGenresFromAPI(setError);


    /*Functions */
    //filterHandler function
    //Used to update filters based on received type and data
    const filterHandler = (type, data) => {
        setFilter(prev => {
            if(type === 'year') {
                prev.years = prev.years.map(year => ({...year, selected: data.some(r => r.id === year.id)}));
            } else if(type === 'genre') {
                prev.genres = prev.genres.map(genre => ({...genre, selected: data.some(r => r.id === genre.id)}))
            } else if(type === 'sort_type') {
                prev.sort = prev.sort ? {...prev.sort, type: data} : {type: data}
            } else if(type === 'sort_direction') {
                prev.sort = prev.sort ? {...prev.sort, direction: data} : {direction: data}
            }
            return prev;
        })
        searchDispatcher({type: 'FILTER', filter})
    };

    //searchHandler function
    //Used to update search results
    const searchHandler = (data, loading) => {
        searchDispatcher({type: 'REFRESH', data: data, isLoading: loading, filter});
    }

    //loadYears function
    //Load a default list of years to choose for release year filter
    const loadYears = useCallback(() => {
        let years = [];
        var date = new Date();
        for(let i = date.getFullYear(); i >= 1945; i--)
            years.push({id: i, value: i});
        return years;
    }, [])


    /*Built-in hooks */
    useEffect(() => {
        if(!isLoaded) {
            setFilter(prev => ({...prev, years: loadYears()}));
    
            //If component is not loaded/no errors are found, send request to fetch genres
            sendGenreRequest().then(res => {
                let _years = loadYears();
    
                //If results are found, set genre array
                setFilter(prev => ({...prev, years: _years, genres: res.genres}));
                setIsLoaded(true);
             })
        }
    }, [isLoaded, error, loadYears, sendGenreRequest])


    /*Content */
    //Return Provider object for SearchContext
    return (
        <SearchContext.Provider value={{
            filter,
            searchResults: searchState.filteredSearchResults,
            isLoading: searchState.isLoading,
            onFilter: filterHandler,
            onSearch: searchHandler
        }}>
            {props.children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;