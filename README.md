# Mancala MVC Java

The project consists of two servers. The front-end uses a nodejs server. The second server is the back-end, which uses a Jetty server. The back-end server allows the Java API to be accessible for other programs, including the front-end server. To prevent [cross-origin request shenanigans (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), all requests from the browser will be sent to the front-end server. That server will then forward to the back-end server if needed.

## Back-end

The back-end server is defined in the MancalaAPI folder. That folder contains a Maven project defining the service layer of the mancala application. The service layer doesn't contain any business logic, instead, the game rules are defined in a seperate project. Therefore, the MancalaAPI has a dependency on the Mancala-domain. This domain is contained in the SNAPSHOT-file. To include the dependency, run the ./installDomain.bash file.

### Run the MancalaAPI project

The HTTP port used in this project is defined within the projects POM, so if port 8080 is already in use you can change the portnumber here. From within the mancala-mvc-java project run the ./runAPIserver.bash to start this server.

## Front-end

The front-end for this case is a React app that can be found in the `MancalaFrontend` folder. Running ./runFEserver.bash installs all required dependencies and starts the server on `localhost:3000`.

Calls to `api/` are forwarded from this server to the Mancala API server (running on `localhost:8080` if you follow the instructions above). If your Mancala API runs on a different port, change the following line in the `webpack.config.js` file:

```json
    proxy: {
        '/api/*': 'http://localhost:8080/mancala/', // <-- change 8080 to a different port if necessary
    }
```

Webpack takes care of compiling the TypeScript code, bundling the output into a single file, etc. A basic configuration is provided, which should take care of most use cases.

## Play Mancala
Install the domain, start the servers and go to localhost:3000 to play mancala.