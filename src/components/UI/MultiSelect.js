/*IMPORTS */
/*React module dependecies */
import Multiselect from "multiselect-react-dropdown";

/*Component stylesheet */
import classes from "./MultiSelect.module.css";

/*IMPORTS END */

const MultiSelect = props => {

    //Deconstruct props to access properties
    const { label, options, selectedOptions, displayValue, onChange } = props;


    /*Functions */
    //listHandler function
    //Handles all changes connected to Multiselect component;
    //List of currently selected values are returned to onChange property, if this is set
    const listHandler = (selectedList, currentValue) => {

        if(onChange){
            onChange(selectedList);
        }
    }


    /*Content */
    return (
        <div className={classes.container}>
            {label && <label>{label}</label>}
            {options && options.length > 0 &&
                <Multiselect options={options} 
                             selectedValues={selectedOptions} 
                             displayValue={displayValue} 
                             placeholder="Velg"
                             selectionLimit={8}
                             style={{
                                searchBox: {
                                    border: 'none',
                                    maxHeight: '200px',
                                    overflow: 'auto',
                                    width: '100%'
                                },
                                inputField: {
                                    marginTop: '-10px',
                                    width: '100%',
                                    border: '1px solid gray',
                                    height: '30px'
                                }
                            }} onSelect={listHandler} onRemove={listHandler}/>
            }
        </div>
    )
}

export default MultiSelect;