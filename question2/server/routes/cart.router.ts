import { Router, IRouter } from 'express';
import {getProductsBySkus, getTotal, checkout} from '../controllers/cart.controllers';

const router: IRouter = Router();

router.post('/details', getProductsBySkus);
router.post('/total', getTotal);
router.post('/checkout', checkout);

export default router;