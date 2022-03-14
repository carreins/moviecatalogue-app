# About this project

This is a simplified web application, created to demonstrate various capabilities of the ReactJS library, such as use of
states, context and HTTP communication, as well as the possibility of creating custom hooks and components for usage in a web application.

This demo works as a movie catalogue, with two main functions/pages:

1. Show a list of movies on the front page. The list contains recently trending movies, it is possible to get additional details in a popup by clicking a movie in the list.
2. Allow the user to search for movies by title; the user can filter search results on genre and release year, and sort on release year, title and popularity. 
It is also possible to get additional details in a popu by clickinga search result.

The project utilizes The Movie Database API, which requires you to provide an API key to access. Please follow below instructions to set up the project.

### How to use
1. Create a new account on The Movie Database website: https://www.themoviedb.org/
2. Once you have logged in, you can apply for an API key by clicking the "API" link from the left hand sidebar within your account settings page. You need to have a legitimate business name, address, phone number and description to apply for an API key. Once your request has been approved, you will receive the key.
3. Create an environment and add 3 parameters:
    - REACT_APP_API_URL with value https://api.themoviedb.org
    - REACT_APP_API_VERSION with value 3
    - REACT_APP_API_KEY, which will hold the value of your received API key

Once these steps have been taken, you should be able to run this project.

For more information on the API, [click here](https://www.themoviedb.org/documentation/api)
For developer documentation, [click here](https://developers.themoviedb.org/3)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

