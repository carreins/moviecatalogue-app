
/*IMPORTS */
/*React and React module dependencies*/
import React from "react";
import { useState, useContext } from "react";

/*Custom components */
import SearchFilter from "./SearchFilter";

/*Custom UI components */
import Card from "../UI/Card";
import Modal from "../UI/Modal";

import { SearchContext } from "../../storage/search-context";

/*Component stylesheet import */
import classes from "./SearchInput.module.css";

/*SVG icon import */
import { ReactComponent as FilterIcon } from "./Icons/filter.svg"
import { ReactComponent as CrossIcon } from "./Icons/cross.svg";

/*IMPORTS END */


const SearchInput = React.forwardRef((props, ref) => {

    //Deconstruct props to access objects
    const { className, onChange } = props;


    /*useState */
    const [isFilter, setIsFilter] = useState(false);
    const [inputValue, setInputValue] = useState('');


    /*useContext */
    //Fetch filter; use it to check if there is an active filter on the page
    const { filter } = useContext(SearchContext);
    const isFilterDefined = filter && ((filter.genres && filter.genres.length > 0 && filter.genres.some(r => r.selected)) || 
                                        (filter.years && filter.years.length > 0 && filter.years.some(r => r.selected)) || 
                                        (filter.sort && filter.sort.type && filter.sort.direction));


    /*Functions */
    //changeHandler function
    const changeHandler = (event) => {
        setInputValue(prev => event.target.value);

        if(onChange) {
            onChange(event.target.value);
        }
    }


    /*Content */
    const addedText = inputValue.length > 0;

    return (
        <Card className={`${classes.container} ${className ? className : ''}`}>
            {isFilter && <button className={classes["go-back"]} onClick={() => setIsFilter(false)}>{'<= Tilbake'}</button>}
            <div className={classes.icons}>
                {addedText && <CrossIcon onClick={() => { setInputValue(''); onChange(''); }}/>}
                {!isFilter && <FilterIcon fill={isFilterDefined ? "lightgreen" : "black"} onClick={() => setIsFilter(true)}/>}
            </div>
            {isFilter && <h3>Avansert søk</h3>}
            <div className={classes.search}>
                {isFilter && <label>Tittel</label>}
                <input type="text" 
                       className={classes.search}
                       placeholder="Søk"
                       onChange={changeHandler}
                       value={inputValue}
                       ref={ref}/>
            </div>
            {isFilter && <Modal onClose={() => setIsFilter(false)}>
                <SearchFilter />
            </Modal>}      
        </Card>
    )
});

export default SearchInput;