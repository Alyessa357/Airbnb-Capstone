import axios from "axios";

// Backend listings API base URL
const API_URL =
    // "http://localhost:5000/api/listings";
    "https://airbnb-capstone-backend-server.onrender.com/api/listings";


// Get all listings
const getListings = async () => {

    const response =
        await axios.get(API_URL);

    return response.data;

};


// Get single listing
const getListingById = async (
    listingId
) => {

    const response =
        await axios.get(
            `${API_URL}/${listingId}`
        );

    return response.data;

};


const listingService = {
    getListings,
    getListingById
};

export default listingService;
