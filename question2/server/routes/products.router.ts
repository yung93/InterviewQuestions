import { Router, IRouter } from 'express';
import {getProductsByCategory} from '../controllers/product.controllers';

const router: IRouter = Router();

router.get('/', getProductsByCategory);

export default router;