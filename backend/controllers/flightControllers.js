import axios from 'axios';

export const getFlightSchedules = async (req, res) => {
    try {
        const response = await axios.get('/flights');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching flight schedules', error: error.message });
    }
};
