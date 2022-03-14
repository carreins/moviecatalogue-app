/*IMPORTS */
/*Component stylesheet */
import classes from './LoadingSpinner.module.css';

/*IMPORTS END */

const LoadingSpinner = props => {

  /*Content */
  return <div className={`${classes.spinner} ${props.className ? props.className : ''}`}></div>;
}

export default LoadingSpinner;
