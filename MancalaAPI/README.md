# Mancala MVC Java

The project consists of two servers. The front-end uses a nodejs server. The second server is the back-end, which uses a Jetty server. The back-end server allows the Java API to be accessible for other programs, including the front-end server. The front-end server will forward calls to the API to the back-end server if needed.

## Back-end

The back-end server is defined in the MancalaAPI folder. This folder contains a Maven project defining the service layer of the application. The service layer doesn't contain any business logic, so the game rules are defined in a seperate project. This is usually done via a dependency between different projects. Therefore, the MancalaAPI has a dependency on the MancalaDomain. See the main README.

### Run the MancalaAPI project

The HTTP port used in this project is defined within the projects POM, so if port 8080 is already in use you can change the portnumber here. To get the server started, run the ./runAPIserver.bash from the mancala-mvc-java folder.

### Structure
Most of the folders here are used by Maven or the Jetty server. The important files of the application are contained in /src/main/java/nl/sogyo/mancala/api. The MancalaInitialize.java contains the class reacting on the original POST request to start the game and creates a mancala-object for the session. MancalaGame.java contains the handling of a PUT request for making a move. The files in the models folder contain the layout for and handling of the information of the game to be sent in the response-json.
