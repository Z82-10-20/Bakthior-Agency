import express from 'express';
import { getFlightSchedules } from '../controllers/flightControllers';

const router = express.Router();

router.get('/flights', getFlightSchedules);

export default router;
