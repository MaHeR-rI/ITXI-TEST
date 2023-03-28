# ITXI-TEST

## basic Spotify application
this app  let a user search for an artist to
retrieve information about his/her albums.
*  I used React js version 18.2.0 to build this app.
*  I used useContext hook and make it a store for the user's token , the token will be expires after 1 hour , automatically the app logged out and the user
should be login again .
*  about the artist's rating i don't know on what is based (popularity does not worked with me), for that i Divided the popularity on random number "15" (popularity/15)
to get an dummy rating number.
*  usually adding styles applications using CSS Modules,CSS Modules are convenient for components that are placed in separate files, but this app is simple the style in 1 file app.css .
*  Images that came from spotify have a different sizes, so i specified a max-height.


## How users can get started with the project.

1  open the project's terminal and run "npm install"
2  then run "npm start"


## App functionalities

-the user must be login in with spotify credentials.
-then he redirect to the search page.
-when the user type in the search field the fetching will start 
-choose one of the artists (by clicking to card) to redirect to his/her albums
-then you can select an album (by clicking to preview on spotify button) to redirect to the spotify web and listen
-you can logout by clicking on logout button on the navbar


## dependencies that i used

    "react-rating-stars-component": "^2.2.0",
    "react-router-dom": "^6.4.2",
    "axios": "^1.1.3",
    "@fortawesome/free-solid-svg-icons": "^6.2.0",
    
    
## the users who granted access :

#### review-my-code@itxi.net

