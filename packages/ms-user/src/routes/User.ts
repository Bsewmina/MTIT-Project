import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/User';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const user = await User.find({});
  res.send(user);
});

router.get('/:user_name', async (req: Request, res: Response) => {
  const user = await User.findOne({ user_name: req.params.user_name });
  if (!user) {
    res.status(400).send('Not available');
  }
  res.status(200).send(user);
});

router.post(
  '/',
  [
    body('user_name').not().isEmpty().withMessage('Please enter user name'),
    body('user_address').not().isEmpty().withMessage('please enter the address'),
    body('user_phone').not().isEmpty().withMessage('Please enter contact Number'),
  ],
  async (req: Request, res: Response) => {
    let isAvailable = await User.findOne({ user_name: req.body.user_name });

    if (isAvailable) {
      res.status(400).send('Username already exists');
    } else {
      const user = await User.build({
        user_name: req.body.user_name,
        user_address: req.body.user_address,
        user_phone: req.body.user_phone,
      });

      try {
        await user.save();
      } catch (err) {
        console.log(err);
      }
      res.status(201).send(user);
    }
  }
);

router.put(
  '/:user_name',
  [
    body('user_name').not().isEmpty().withMessage('Please enter user name'),
    body('user_address').not().isEmpty().withMessage('please enter the address'),
    body('user_phone').not().isEmpty().withMessage('Please enter contact Number'),
  ],

  async (req: Request, res: Response) => {
    const user = await User.findOne({ user_name: req.params.user_name });
    if (!user) {
      res.status(400).send('Not available');
    } else {
      user.set({
        user_name: req.body.user_name,
        user_address: req.body.user_address,
        user_phone: req.body.user_phone,
      });

      await user.save();
      res.status(201).send(user);
    }
  }
);

router.delete('/:user_name', async (req: Request, res: Response) => {
  const user = await User.findOne({ user_name: req.params.user_name });
  if (!user) {
    res.status(400).send('Not available');
  } else {
    await user.remove({ user_name: req.params.user_name });
    res.send('user with Username : ' + req.params.user_name + ' successfully Removed');
  }
});

export { router as userRouter };
