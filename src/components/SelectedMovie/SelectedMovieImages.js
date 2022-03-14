/*IMPORTS */
/*React module dependencies*/
import { Carousel } from "react-bootstrap";

/*Component stylesheet */
import classes from "./SelectedMovieImages.module.css";

/*IMPORTS END */


//Component used to display images associated with this movie
const SelectedMovieImages = props => {

    //Deconstruct props.movie to get component objects
    const { poster_path, images } = props.movie;


    /*Content */
    //Declare img src array
    let imgSrcArray = [];

    if(poster_path){

        //poster_path is main image source for loaded movie; if it exists, it will be displayed first
        imgSrcArray.push("https://image.tmdb.org/t/p/original" + poster_path);
    }
    
    if(images && images.posters){

        //If movie also contains other posters, add to src array. Limit is set to 5
        for(let i = 0; i < (images.posters.length <= 5 ? images.posters.length : 5); i++)
            imgSrcArray.push("https://image.tmdb.org/t/p/original" + images.posters[i].file_path);
    }

    //Declare content
    let content = <></>

    if(imgSrcArray){

        if(imgSrcArray.length === 1) {

            //If only 1 source is added to array, set content as single img 
            content = <img src={imgSrcArray[0]} alt="movie_poster"/>
        } else {

            //If multiple source is added, set content to Carousel of img
            content = <Carousel interval={2000}>
                {imgSrcArray.map((src, index) => (
                    <Carousel.Item key={index}>
                        <img src={src} alt="movie_poster"/>
                    </Carousel.Item>
                ))}
            </Carousel>
        }
    }

    return (
        <div className={classes.media}>
            {content}
        </div>
    )
}

export default SelectedMovieImages;