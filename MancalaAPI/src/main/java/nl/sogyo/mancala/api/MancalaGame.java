package nl.sogyo.mancala.api;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/play")
public class MancalaGame {
	
	// Example call ==> http://localhost/mancala/api/play/3
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{pit}")
	public Response playGet(
			@PathParam("pit") String pit, 
			@Context HttpServletRequest request) {
		
		//TODO: Implement this method!
		
		return null;
	}
	
}
