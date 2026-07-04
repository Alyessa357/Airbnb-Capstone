import axios from "axios";

const API_URL =
    "http://localhost:5000/api/listings";


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