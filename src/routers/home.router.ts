import { Router } from 'express';
import { showHome } from '../controllers/home.controller';

const homeRouter = Router();

homeRouter.get('/', showHome);

export default homeRouter;
