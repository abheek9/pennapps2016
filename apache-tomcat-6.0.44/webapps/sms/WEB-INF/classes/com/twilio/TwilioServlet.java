//package com.twilio;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
 
import com.twilio.sdk.verbs.TwiMLResponse;
import com.twilio.sdk.verbs.TwiMLException;
import com.twilio.sdk.verbs.Message;
 
public class TwilioServlet extends HttpServlet {
	private String signupStr = "Signup";
	private String stateForParser;
	
	
    public void service(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Create a dict of people we know.
        /*HashMap<String, String> callers = new HashMap<String, String>();
        callers.put("+14158675309", "Curious George");
        callers.put("+14158675310", "Boots");
        callers.put("+14158675311", "Virgil");
        */
        
        String fromNumber = request.getParameter("From");
        String fromMessage = request.getParameter("Body");
        System.out.println(fromMessage);
        String message;
        if(fromMessage.equals(signupStr)){
        	stateForParser = "signup";
        }
        TwilioParser tp = new TwilioParser(fromNumber, fromMessage, stateForParser);
        message = tp.getResponse();
        if(fromMessage.equals("aaa")) {
            message = "This worked";
        } else if(fromMessage.equals(null)) {
            message = "We have the wrong parameter";
        } else {
            message = "This is really failing";
        }
        //String knownCaller = callers.get(fromNumber);
        /*String message;
        if (knownCaller == null) {
            // Use a generic message
            message = "Monkey, thanks for the message!";
        } else {
            // Use the caller's name
            message = knownCaller + ", thanks for the message!";
        }
        */
        // Create a TwiML response and add our friendly message.
        TwiMLResponse twiml = new TwiMLResponse();
        Message sms = new Message(message);
        try {
            twiml.append(sms);
        } catch (TwiMLException e) {
            e.printStackTrace();
        }
 
        response.setContentType("application/xml");
        response.getWriter().print(twiml.toXML());
    }
}