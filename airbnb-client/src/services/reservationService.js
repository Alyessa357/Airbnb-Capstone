// Import axios
import axios from "axios";

// Backend reservation endpoint
const API_URL =
    // "http://localhost:5000/api/reservations";
    "https://airbnb-capstone-backend-server.onrender.com/api/reservations";


// Create reservation
const createReservation = async (
    reservationData,
    token
) => {

    const response =
        await axios.post(

            API_URL,

            reservationData,

            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }

        );

    return response.data;

};

// client reservation
const getMyReservations =
    async (token) => {

        const response =
            await axios.get(

                `${API_URL}/my-trips`,

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }

            );

        return response.data;

    };

const deleteReservation = async (id, token) => {
    const response = await axios.delete(`${API_URL}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Export service
const reservationService = {
    createReservation,
    getMyReservations,
    deleteReservation,
};

export default reservationService;