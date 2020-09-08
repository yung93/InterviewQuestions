import { Router, IRouter } from 'express';
import {getTransaction, getTotal, checkout} from '../controllers/transaction.controllers';

const router: IRouter = Router();

router.get('/:transactionID', getTransaction);
router.post('/summary', getTotal);
router.post('/checkout/:transactionID', checkout);

export default router;