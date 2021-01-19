package nl.sogyo.mancala.api;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import nl.sogyo.mancala.api.models.MancalaDto;
import nl.sogyo.mancala.domain.Mancala;

@Path("/play")
public class MancalaGame {
	
	// Example call ==> /mancala/api/play/3
	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{pit}")
	public Response playGet(
			@PathParam("pit") String pit, 
			@Context HttpServletRequest request) {

		HttpSession session = request.getSession(false);
		Mancala mancala = (Mancala) session.getAttribute("mancala");
		
		int pitNr = Integer.parseInt(pit);
		int playerNr = pitNr < 7 ? 1 : 2;
		
		int responseStatus = 500;
		try {
			if (mancala.isToMovePlayer(playerNr) && 
					mancala.getStonesForPit(pitNr) != 0) {
				mancala.playRecess(pitNr);
				responseStatus = 200;
				var output = new MancalaDto(mancala, mancala.getPlayerName(1), mancala.getPlayerName(2));
				return Response.status(responseStatus).entity(output).build();
			}
			else if (!mancala.isToMovePlayer(playerNr) || 
					mancala.getStonesForPit(pitNr) == 0) {
				responseStatus = 204;
				return Response.status(responseStatus).build();
			}
			else throw new IllegalStateException();
		}
		catch (IllegalStateException err) {
			responseStatus = 406;
			return Response.status(responseStatus).build();
		}
		
	}
	
}
