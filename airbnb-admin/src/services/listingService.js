// Import axios
import axios from "axios";

// Backend URL
// const API_URL = "http://localhost:5000/api/listings";
const API_URL = "https://airbnb-capstone-backend-server.onrender.com/api/listings";


// Create listing
const createListing = async (listingData, token) => {

    const response = await axios.post(

        API_URL,

        listingData,

        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }

    );

    return response.data;

};

// Get all listings
const getListings = async (token) => {

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

// Get single listing
const getListingById = async (
    listingId,
    token
) => {

    const response = await axios.get(
        `${API_URL}/${listingId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

// Update listing
const updateListing = async (
    listingId,
    listingData,
    token
) => {

    const response = await axios.put(
        `${API_URL}/${listingId}`,
        listingData,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;

};

// Delete listing
const deleteListing = async (
    listingId,
    token
) => {

    const response = await axios.delete(
        `${API_URL}/${listingId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Export service
const listingService = {
    createListing,
    getListings,
    getListingById,
    updateListing,
    deleteListing
};

export default listingService;




