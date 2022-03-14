/*
    HTTP MOVIE HOOKS
    Class file containing custom hooks for http requests to movie API
    Requests are specifically made to movie endpoint
*/

//.env variables for API usage
const { REACT_APP_API_URL, REACT_APP_API_VERSION, REACT_APP_API_KEY } = process.env;

//useGetSearchAPIForObject function
//Exports function which is used to fetch single movie object from movie API
//  - param setError: used to send a dispatch method to update an error state in calling component;
//    this is done to have a single error state for both hook and component
//  - Returns async function which is used for the http request
export const useGetSearchAPIForObject = (setError) => {

    //Async function returned
    //  - param id: used to determine the desired movie in the API request
    const sendRequest = async (id) => {

        //Declare result object
        let result;

        let valid = id && Number(id) > 0;
        if(!valid) {

            //If id is not valid, set error state and skip rest
            setError('Ugyldige verdier angitt for søk.');
        } else{

            try{

                //Generate endpoint url
                let requestEndpoint = `${REACT_APP_API_URL}/${REACT_APP_API_VERSION}/movie/${id}`;
                requestEndpoint = requestEndpoint + `?api_key=${REACT_APP_API_KEY}&append_to_response=videos,images`;

                //Try to send request to movie API
                const response = await fetch(requestEndpoint);
            
                //If request is not successful, throw error
                if(!response.ok){
                    throw new Error('Spørring feilet.');
                }

                //If request is successful, populate result object
                result = await response.json();

            }catch(err){

                //Catch and set error
                setError(err.message || 'Noe gikk galt.');
            }
        }

        //Return result object
        return result;
    }

    return sendRequest;
}

//useGetSearchAPIForArray
//Exports function which is used to fetch array of movie object data from movie API
//  - param setError: used to send a dispatch method to update an error state in calling component;
//    this is done to have a single error state for both hook and component
//  - Returns async function which is used for the http request
export const useGetSearchAPIForArray = (setError) => {

    //Async function returned
    //If param queryString is set, request is sent to API to receive movie data
    const sendRequest = async (type, queryString) => {

        //Declare results array
        let results = [];

        let valid = type.toLowerCase() === 'trending' || (queryString && queryString.trim().length > 0);
        if(!valid){

            //If validation fails, add error and skip rest
            setError('Ugyldige verdier angitt for søk.');
        } else {

            try{

                //Generate endpoint url
                let requestEndpoint = `${REACT_APP_API_URL}/${REACT_APP_API_VERSION}/${type}/movie`;
                if(type.toLowerCase() === 'trending') requestEndpoint = requestEndpoint + '/day'; //add weekend?
                requestEndpoint = requestEndpoint + `?api_key=${REACT_APP_API_KEY}&${queryString}`;

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
        }

        //Return results array
        return results;
    }

    return sendRequest;
};
