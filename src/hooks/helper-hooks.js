/*
    HELPER HOOKS
    Class file containing custom hooks for use in components
*/

/*IMPORTS */
/*React module dependencies */
import { useState } from "react";

/*IMPORTS END */


//useCountdownTimer function
//Exports functionality to initialize and use a timer which will count down
//  - param time: used to decide length of time that timer will use to count down to 0
//  - Returns start/reset timer function, stop/clear timer function, and boolean to indicate if timer has completed countdown
export const useCountdownTimer = (time) => {

    //Declare states for time and interval
    const [timeUntilSearch, setTimeUntilSearch] = useState(time);
    const [interval, setCustInterval] = useState();

    //startOrResetTimer function
    //Used to start or reset timer
    const startOrResetTimer = () => {

        if(interval){

            //If interval is set, it means that timer is already started; timer is then reset
            setTimeUntilSearch(prev => time)
        } else {

            //Otherwise interval is initialized
            setCustInterval(setInterval(() => {
                setTimeUntilSearch(prev => {
                    if (prev > 0) {
                        return prev - 1;
                    }  
                })
            }, 1000));
        }
    }

    //stopAndClearTimer function
    //Used to stop and clear timer
    const stopAndClearTimer = () => {

        //Interval is cleared
        setCustInterval(prev => {
            clearInterval(interval);
            return undefined;
        })

        //Time is reset
        setTimeUntilSearch(prev => time);
    }

    //isComplete property
    //Exported to allow component to check if timer has completed countdown
    const isComplete = interval && timeUntilSearch === 0;

    return {
        startOrResetTimer,
        stopAndClearTimer,
        isComplete
    }
}


export const filterExistsInStorage = () => {
    let filterString = localStorage.getItem('search_movie_filter');

    if(!filterString)
        return false;
    else 
        return true;
}


export const getFilterFromStorage = (filter) => {
    if(!filter || !filter.years || !filter.genres){
        return;
    }

    let copyFilter = {...filter};

    let filterString = localStorage.getItem('search_movie_filter');

    if(filterString){
        const storedFilter = JSON.parse(filterString);

        if(storedFilter) {
            try {
                copyFilter.years = copyFilter.years.map(year => {
                    return {...year, selected: storedFilter.years.some(r => r.value === year.value)}
                })
                copyFilter.genres = copyFilter.genres.map(genre => {
                    return {...genre, selected: storedFilter.genres.some(r => r.id === genre.id)}
                })
                copyFilter["sort"] = storedFilter.sort;
            } catch(err) {
                console.log(err ? err.message : 'An error occurred.'); 
                return;
            }
        }
    }

    return copyFilter;
}


export const updateFilterInStorage = (filter) => {
    if(!filter){
        localStorage.removeItem('search_movie_filter');
        return;
    }

    try{
        let filterObj = {
            years: filter.years.filter(year => year.selected),
            genres: filter.genres.filter(genre => genre.selected),
            sort: filter.sort,
        }

        localStorage.setItem('search_movie_filter', JSON.stringify(filterObj));
    } catch(err) {
        console.log(err ? err.message : 'An error occurred.'); 
    }
}