// Environment variable exports for API URLs
export const AI_CHATBOT_URL = import.meta.env.AI_CHATBOT_URL;
export const MACHINE_CHATBOT_URL = import.meta.env.MACHINE_CHATBOT_URL;
export const AI_MAIN_URL = import.meta.env.AI_MAIN_URL;
export const RUST_MAIN_URL = import.meta.env.RUST_MAIN_URL;
export const RUST_BACKEND_URL_SCORE = import.meta.env.RUST_BACKEND_URL_SCORE;
export const MAJOR_CHAT_SERVICE = import.meta.env.MAJOR_CHAT_SERVICE;
export const chatBaseURL = import.meta.env.CHAT_BASE_URL;

import axios from "axios";

/**
 * Function to make a POST request using Axios.
 * @param {string} url - The endpoint URL for the request.
 * @param {Object} body - The body of the request to send.
 * @returns {Promise<Object>} - The response data or an error object.
 */
export const postRequest = async (url, body) => {
    try {
        console.log("Main body", body); // Log the request body for debugging

        const response = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials for CORS requests
        });

        // Return the response data
        return response.data;

    } catch (error) {
        // Handle and return error details
        return {
            error: true,
            message: error.response?.data?.message || error.message
        };
    }
};

/**
 * Function to make a GET request using the Fetch API.
 * @param {string} url - The endpoint URL for the request.
 * @returns {Promise<Object>} - The response data or an error object.
 */
export const getRequest = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            // Construct error message if the response is not OK
            let message = "An error occurred";
            if (data?.message) {
                message = data.message;
            }
            return { error: true, message: message };
        }

        // Return the successful response data
        return data;

    } catch (error) {
        // Handle and return error details
        return {
            error: true,
            message: error.message || "An unexpected error occurred."
        };
    }
};
