import { Router } from 'express';

const paymentRouter = Router();

paymentRouter.get('/success/:cid', (req, res) => {
    const { cid } = req.params;
    console.log(cid)
  return res.status(200).send({ mesagge: `Payment of cart ${cid} Success!!!` });
});

paymentRouter.get('/cancel/:cid', (req, res) => {
  console.log('Payment Rejected...');
});

export default paymentRouter;
