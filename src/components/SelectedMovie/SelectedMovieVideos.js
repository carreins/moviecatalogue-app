/*IMPORTS */
/*React module dependencies*/
import { Carousel } from "react-bootstrap";

/*IMPORTS END */

const SelectedMovieVideos = props => {

    //Deconstruct props to access videos
    const { videos } = props;


    /*Content */
    //Declare video url array
    let videoUrlArray = [];

    if(videos.results && videos.results.length > 0){

        //If videos are found, and are accessible on YouTube, url is pushed to array. Limit is set at 5
        for(let i = 0; i < (videos.results.length <= 5 ? videos.results.length : 5); i++){
            if(videos.results[i].site.toLowerCase() === "youtube"){
                videoUrlArray.push("https://youtube.com/embed/" + videos.results[i].key);
            }
        }
    }

    //Declare JSX content variable
    let content = <></>

    if(videoUrlArray.length === 1){
        
        //If only 1 video url is found, content is set as a single iframe 
        content = 
            <iframe className='video'
                    width={400}
                    height={400}
                    title='Youtube player'
                    sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                    src={videoUrlArray[0]}
                    allowFullScreen={true}>
            </iframe>
    } else {

        //If multiple video urls are found, content is set as a Carousel of iframes
        content = <Carousel>
            {videoUrlArray.map((videoUrl, index) => (
                <Carousel.Item key={index}>
                    <iframe className='video'
                            width={400}
                            height={400}
                            title='Youtube player'
                            sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                            src={videoUrl}
                            allowFullScreen={true}>
                    </iframe>
                </Carousel.Item>
            ))}
        </Carousel>
    }

    return (
        <div>
            {content}
        </div>
    )
}

export default SelectedMovieVideos;