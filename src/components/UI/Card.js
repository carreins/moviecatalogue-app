/*IMPORTS */
/*Component stylesheet */
import classes from "./Card.module.css";

/*IMPORTS END */

const Card = props => {

    /*Content */
    return (<div className={`${classes.card} ${props.className ? props.className : ''}`}>{props.children}</div>)
}

export default Card;