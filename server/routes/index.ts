import { Router } from 'express';
import { getPlantData } from '../contollers/getPlantController';

const router = Router();

router.get('/plants', getPlantData);

export default router;