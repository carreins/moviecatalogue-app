/*
    SEARCH REDUCER
    Custom reducer for use in search page; maintains currently loaded data from movie,
    results from loaded data where filters are applied and loading indicator.
*/


/*IMPORTS */
/*React module dependencies */
import { useReducer } from "react"

/*IMPORTS END */


//Declare initial state object 
const initialSearchState = {

    //searchResults: contains complete object from movie API, which contains results array, current page, total results
    searchResults: {},

    //filteredSearchResults: array of results shown from search and applied filter
    filteredSearchResults: [],

    //isLoading: indicates if loading is active
    isLoading: false,

}


//searchReducer function
//Function used in the search reducer
//  - param state: the current state of the reducer
//  - param action: the body of the dispatched action; expected to contain two properties /type/ and /data/; isLoading optional
const searchReducer = (state, action) => {

    //switch/case on action.type
    switch(action.type) {

        //action.type === 'REFRESH': reload searchResults and filteredSearchResults from action.data
        case 'REFRESH':
            let filteredSearchResults1 = handleFilterResults(action.data.results, action.filter);
            return {
                searchResults: action.data,
                filteredSearchResults: filteredSearchResults1,
                isLoading: action.isLoading ? action.isLoading : false
            }
        
        //action.type === 'FILTER'
        //set filteredSearchResults based on sent filter data
        //action.data is expected to contain /type/ for filter type and data
        case 'FILTER':

            //Handle filtering
            let filteredSearchResults2 = handleFilterResults(state.searchResults.results, action.filter);

            return {
                searchResults: state.searchResults,
                filteredSearchResults: filteredSearchResults2,
                isLoading: state.isLoading
            }
        default:

            //Return initial state by default
            return initialSearchState;
    }
}


//handleFilterResults function
//Function used in the search reducer
//  - param data: data to be filtered
//  - param filter: current filter to use
const handleFilterResults = (data, filter) => {
    let filteredData; 

    if(data){

        filteredData = [...data];

        if(filter){

            if(filter.years && filter.years.length > 0){

                const selectedYears = filter.years.filter(year => year.selected);
                if(selectedYears.length > 0){

                    //If filter has selected years, filter out results where release date is missing,
                    //or release year has no match
                    filteredData = filteredData.filter(result => {
                        if(result.release_date){
                            var date = new Date(result.release_date);
                            return selectedYears.some(r => r.value === date.getFullYear());
                        }
                        return false;
                    });

                }
            }
            if(filter.genres && filter.genres.length > 0) {

                const selectedGenres = filter.genres.filter(genre => genre.selected);
                if(selectedGenres.length > 0){

                    //If filter has selected genres, filter out results where genre ids are not found or has no match
                    filteredData = filteredData.filter(result => {
                        if(result.genre_ids && result.genre_ids.length > 0){
                            return selectedGenres.some(r => {
                                return result.genre_ids.indexOf(r.id) >= 0}
                            );
                        }
                        return false;
                    })
                }
            }
            if(filter.sort && filter.sort.type && filter.sort.direction) {
                const { type, direction } = filter.sort;

                filteredData = filteredData.sort((a, b) => {
                    let dirResult = 0;
                    if(type === 'title') {
                        dirResult = direction === 'asc' ? 
                                a.title.toLowerCase().localeCompare(b.title.toLowerCase()) :
                                b.title.toLowerCase().localeCompare(a.title.toLowerCase());
                    } else if(type === 'release_year'){
                        if(!a.release_date)
                            dirResult = 1;
                        else if(!b.release_date)
                            dirResult = -1;
                        else {
                            let aYear = new Date(a.release_date).getFullYear();
                            let bYear = new Date(b.release_date).getFullYear();

                            dirResult = direction === 'asc' ? aYear - bYear : bYear - aYear;
                        }
                    } else if(type === 'popularity') {
                        if(!a.popularity)
                            dirResult = 1;
                        else if(!b.popularity)
                            dirResult = -1;

                        dirResult = direction === 'asc' ? a.popularity - b.popularity : b.popularity - a.popularity;
                    }
                    return dirResult;
                })
            }
        }
    }

    return filteredData;
}

//Exported function; returns reducer objects
const useSearchReducer = () => {
    return useReducer(searchReducer, initialSearchState);
}

export default useSearchReducer;