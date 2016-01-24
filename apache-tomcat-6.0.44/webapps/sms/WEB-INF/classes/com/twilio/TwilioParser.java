
public class TwilioParser {
	private String state;
	public TwilioParser(String fromNumber, String inputMessage, String state){
		this.state = state;
	}
	
	public String getResponse(String state){
		String response = "";
		switch (state){
			case "signup":{
				response = "Respond with 1 to sign up as a worker\n";
				response+= "Respond with 2 to sign up as an employer\n";
				response+= "Respond with 3 to sign up as both an employer and a worker";
				break;
			}
			default:{
				response = "Did not recognize command";
			}
		}
		return response;
	
	}
	
	
	
	
}
