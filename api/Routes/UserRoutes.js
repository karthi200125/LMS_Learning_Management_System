import express from 'express';
import { StripeCheckout, UserUpdate } from '../Controllers/UserController.js';
import { VerifyToken, VerifyUser } from '../Utils/VerifyToken.js';


const router = express.Router();

router.put("/update", VerifyToken, VerifyUser, UserUpdate);
router.post("/stripecheckout", StripeCheckout);

export default router;
