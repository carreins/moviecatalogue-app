import Multiselect from "multiselect-react-dropdown";

import classes from "./MultiSelect.module.css";

const MultiSelect = props => {
    const { label, options, selectedOptions, displayValue, onChange } = props;
    const listHandler = (a, b) => {
        onChange(a);
    }
    return (
        <div className={classes.container}>
            {label && <label>{label}</label>}
            {options && options.length > 0 &&
                <Multiselect options={options} selectedValues={selectedOptions} displayValue={displayValue} style={{
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