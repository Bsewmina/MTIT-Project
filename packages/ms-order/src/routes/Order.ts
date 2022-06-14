import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Order } from '../models/Order';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const order = await Order.find({});
  res.send(order);
});

router.post(
  '/',
  [
    body('order_total').not().isEmpty().withMessage('Please enter a order total'),
    body('order_itemcount').not().isEmpty().withMessage('please enter order item count'),
    body('book_name').not().isEmpty().withMessage('Please enter book name'),
    body('unit_price').not().isEmpty().withMessage('please enter unit price'),
  ],
  async (req: Request, res: Response) => {
    const order = await Order.build({
      order_total: req.body.order_total,
      order_itemcount: req.body.order_itemcount,
      book_name: req.body.book_name,
      unit_price: req.body.unit_price,
    });

    try {
      await order.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).send(order);
  }
);

// search order by book name
router.get('/:book_name', async (req: Request, res: Response) => {
  const order = await Order.findOne({ book_name: req.params.book_name });
  if (!order) {
    //throw new Error('Not available');
    res.status(400).send('Not available');
  }
  res.status(200).send(order);
});

router.delete('/:id', async (req: Request, res: Response) => {
  const order = await Order.findOne({ _id: req.params.id });
  if (!order) {
    res.status(400).send('Not available');
  } else {
    await order.remove({ _id: req.params.id });
    res.send('order ID : ' + order._id + ' successfully Removed');
  }
});

router.put(
  '/:id',
  [
    body('order_total').not().isEmpty().withMessage('Please enter a order total'),
    body('order_itemcount').not().isEmpty().withMessage('please enter order item count'),
    body('book_name').not().isEmpty().withMessage('Please enter book name'),
    body('unit_price').not().isEmpty().withMessage('please enter unit price'),
  ],

  async (req: Request, res: Response) => {
    const order = await Order.findOne({ _id: req.params.id });
    if (!order) {
      res.status(400).send('Not available');
    } else {
      order.set({
        order_total: req.body.order_total,
        order_itemcount: req.body.order_itemcount,
        book_name: req.body.book_name,
        unit_price: req.body.unit_price,
      });

      await order.save();
      res.status(201).send(order);
    }
  }
);

export { router as orderRouter };
