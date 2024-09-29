export const AI_CHATBOT_URL=import.meta.env.AI_CHATBOT_URL
export const MACHINE_CHATBOT_URL= import.meta.env.MACHINE_CHATBOT_URL
export const AI_MAIN_URL= import.meta.env.AI_MAIN_URL
export const RUST_MAIN_URL = import.meta.env.RUST_MAIN_URL
export const RUST_BACKEND_URL_SCORE= import.meta.env.RUST_BACKEND_URL_SCORE
export const MAJOR_CHAT_SERVICE = import.meta.env.MAJOR_CHAT_SERVICE
export const chatBaseURL = import.meta.env.CHAT_BASE_URL
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