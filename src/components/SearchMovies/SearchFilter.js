/*IMPORTS */
/*React module dependencies */
import { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";

/*Custom UI components */
import MultiSelect from "../UI/MultiSelect";

/*Context */
import { SearchContext } from "../../storage/search-context";

/*Component stylesheet */
import classes from "./SearchFilter.module.css";

/*SVG icon import */
import { ReactComponent as ResetIcon } from "./Icons/reset.svg";

/*IMPORTS END */

const SearchFilter = () => {

    /*useContext */
    const { filter, onFilter } = useContext(SearchContext);
    const selectedYears = filter.years.filter(year => year.selected);
    const selectedGenres = filter.genres.filter(genre => genre.selected);
    const selectedSortType = filter.sort && filter.sort.type ? filter.sort.type : '';
    const selectedSortDirection = filter.sort && filter.sort.direction ? filter.sort.direction : '';


    /*Functions */
    //multiselectYearHandler function
    const multiselectYearHandler = (curList) => {

        //If onFilter is set, execute
        if(onFilter) {
            onFilter('year', curList);
        }
    }

    //multiselectGenreHandler function
    const multiselectGenreHandler = (curList) => {

        //If onFilter is set, execute
        if(onFilter) {
            onFilter('genre', curList);
        }
    }

    //selectSortTypeHandler function
    const selectSortTypeHandler = (event) => {

        //If onFilter is set, execute
        if(onFilter) {
            onFilter('sort_type', event.target.selectedIndex > 0 ? event.target.value : undefined);
        }
    }

    //selectSortDirectionHandler function
    const selectSortDirectionHandler = (event) => {
        
        //If onFilter is set, execute
        if(onFilter) {
            onFilter('sort_direction', event.target.selectedIndex > 0 ? event.target.value : undefined);
        }
    }

    //resetHandler function
    //Reset and clear filter
    const resetHandler = () => {

        //If onFilter is set, execute
        if(onFilter) {
            onFilter('reset');
        }
    }


    /*Content */
    return (
        <>
            <div className={classes.header}>
                <h3>Filter</h3>
                <ResetIcon onClick={resetHandler}/>
            </div>
            <Container>
                <Row className={classes["sort-container"]}>
                    <label>Sorter</label>
                    <section>
                        <Row>
                            <Col md="6">
                                <select onChange={selectSortTypeHandler} value={selectedSortType}>
                                    <option value={''}>Velg type</option>
                                    <option value={'title'}>Tittel</option>
                                    <option value={'release_year'}>Utgivelsesår</option>
                                    <option value={'popularity'}>Popularitet</option>
                                </select>
                            </Col>
                            <Col md="6">
                                <select onChange={selectSortDirectionHandler} value={selectedSortDirection}>
                                    <option value={''}>Velg retning</option>
                                    <option value={'asc'}>Stigende</option>
                                    <option value={'desc'}>Synkende</option>
                                </select>
                            </Col>
                        </Row>
                    </section>
                </Row>
                <Row>
                    <Col md="6">
                        <MultiSelect label="Utgivelsesår"
                            options={filter.years}
                            selectedOptions={selectedYears}
                            displayValue="value"
                            onChange={multiselectYearHandler}/>
                    </Col>
                    <Col md="6">
                        <MultiSelect label="Genre"
                            options={filter.genres}
                            selectedOptions={selectedGenres}
                            displayValue="name"
                            onChange={multiselectGenreHandler}/>
                    </Col>
                </Row>
            </Container> 
        </>
    )
}

export default SearchFilter;