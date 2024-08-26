export const AI_CHATBOT_URL="http://ec2-3-6-94-25.ap-south-1.compute.amazonaws.com:9000/chat"
export const MACHINE_CHATBOT_URL="http://ec2-3-6-94-25.ap-south-1.compute.amazonaws.com:9000/match"
export const AI_MAIN_URL="http://ec2-3-6-94-25.ap-south-1.compute.amazonaws.com:9000/"
export const RUST_MAIN_URL ="http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/"
export const RUST_BACKEND_URL_SCORE="http://ec2-3-7-69-234.ap-south-1.compute.amazonaws.com:3001/updatescore"

export const chatBaseURL = "http://ec2-13-233-131-217.ap-south-1.compute.amazonaws.com:1243/api";
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