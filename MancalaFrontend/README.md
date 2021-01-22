# Mancala MVC Java Front-end

The front-end in this folder uses a nodejs server. It is mainly used to compile the React code into Javascript files during development. This will shorten the feedback loop between changing your code and seeing the results in the browser. The back-end server in the MancalaAPI-folder allows the Java API to be accessible for other programs, including the front-end server. To prevent [cross-origin request shenanigans (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), all requests from the browser will be sent to the front-end server. That server will then forward to the back-end server if needed. The back-end server is standard listening at `http://localhost:8080/mancala`.

## Front-end

The front-end for this case is a React app that can be found in the `MancalaFrontend` folder.
In the `MancalaFrontend` folder run `npm install` to install all required dependencies.

Running the front-end is as simple as running `npm start` from within the same folder. This starts a server on `localhost:3000`.

### Structure
In the public-folder are the elements which are shown directly to the browser, consisting of the main HTML-site, the favicon and gamerules and the style-CSS. In the src-folder all the magic happens. The index.tsx gets the HTML file and renders the elements returned by App.tsx. In App.tsx the request functions with the calls to the API-server are contained and passed to either the mancala/StartGame.tsx for the main page or mancala/Play.tsx during the game. The interfaces defined in mancala/gameState.ts are type extension to define the particular objects for this game to TypeScript.
