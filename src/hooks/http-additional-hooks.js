/*
    HTTP ADDITIONAL HOOKS
    Class file containing custom hooks for http requests to movie API
    These requests are additional requests, i.e. they are not made to the movie endpoint
*/

//.env variables for API usage
const { REACT_APP_API_URL, REACT_APP_API_VERSION, REACT_APP_API_KEY } = process.env;


//useGetGenresFromAPI
//Exports function which is used to fetch array of genre object data from movie API
//  - param setError: used to send a dispatch method to update an error state in calling component;
//    this is done to have a single error state for both hook and component
//  - Returns async function which is used for the http request
export const useGetGenresFromAPI = (setError) => {

    //Async function returned
    const sendRequest = async () => {

        //Declare results array
        let results = [];

        try{

            //Generate endpoint url
            let requestEndpoint = `${REACT_APP_API_URL}/${REACT_APP_API_VERSION}/genre/movie/list`;
            requestEndpoint = requestEndpoint + `?api_key=${REACT_APP_API_KEY}`;

            //Try to send request to movie API
            const response = await fetch(requestEndpoint);
            
            //If request is not successful, throw error
            if(!response.ok){
                throw new Error('Spørring feilet.');
            }

            //If request is successful, populate results array
            results = await response.json();

        }catch(err){

            //Catch and set error
            setError(err.message || 'Noe gikk galt.');
        }
        
        //Return results array
        return results;
    }

    return sendRequest;
};
