import axios from "axios";

const API_URL =
    "http://localhost:5000/api/reservations";


// Get all reservations

const getReservations = async (
    token
) => {

    const response = await axios.get(
        API_URL,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};


// Delete reservation

const deleteReservation = async (
    reservationId,
    token
) => {

    const response = await axios.delete(
        `${API_URL}/${reservationId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};


const reservationService = {
    getReservations,
    deleteReservation
};

export default reservationService;