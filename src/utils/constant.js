export const AI_CHATBOT_URL="https://7ecf-117-219-22-193.ngrok-free.app/chat"

export const RUST_BACKEND_URL_SCORE="https://7ecd-117-219-22-193.ngrok-free.app/updatescore"

export const chatBaseURL = "http://localhost:1243/api";
import axios from "axios";

export const postRequest = async (url, body) => {
    try {
        console.log("Main body", body); // Ensure this prints the correct structure
        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Handles cookies and credentials
        });

        // Axios automatically parses JSON responses
        return response.data;

    } catch (error) {
        // Axios provides more detailed error information
        return {
            error: true,
            message: error.response?.data?.message || error.message
        };
    }
};

export const  getRequest = async(url) =>{
    const response = await fetch(url);
    const data = await response.json();
    if(!response.ok){
       let message = "An error occurred"
       if(data?.message){
           message = data.message
       }
       return {error: true, message: message}
    }
    return data;
 
}