import { Router, IRouter } from 'express';
import {getProductsBySkus, getProductsGroupByCategory} from '../controllers/product.controllers';

const router: IRouter = Router();

router.get('/', getProductsGroupByCategory);
router.post('/details', getProductsBySkus);

export default router;