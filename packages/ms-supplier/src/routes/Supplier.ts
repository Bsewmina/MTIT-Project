import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Supplier } from '../models/Supplier';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const supplier = await Supplier.find({});
  res.send(supplier);
});

router.post(
  '/',
  [
    body('company_name').not().isEmpty().withMessage('Please enter company name'),
    body('company_id').not().isEmpty().withMessage('please enter company_id'),
    body('contact_No').not().isEmpty().withMessage('Please enter contact Number'),
    body('location').not().isEmpty().withMessage('please enter the location'),
  ],
  async (req: Request, res: Response) => {
    let isAvailable = await Supplier.findOne({ company_id: req.body.company_id });

    if (isAvailable) {
      res.status(400).send(' company_id already exists');
    } else {
      const supplier = await Supplier.build({
        company_name: req.body.company_name,
        company_id: req.body.company_id,
        contact_No: req.body.contact_No,
        location: req.body.location,
      });

      try {
        await supplier.save();
      } catch (err) {
        console.log(err);
      }
      res.status(201).send(supplier);
    }
  }
);

router.put(
  '/:company_id',
  [
    body('company_name').not().isEmpty().withMessage('Please enter company name'),
    body('company_id').not().isEmpty().withMessage('please enter company_id'),
    body('contact_No').not().isEmpty().withMessage('Please enter contact Number'),
    body('location').not().isEmpty().withMessage('please enter the location'),
  ],

  async (req: Request, res: Response) => {
    const supplier = await Supplier.findOne({ company_id: req.params.company_id });
    if (!supplier) {
      res.status(400).send('Not available');
    } else {
      supplier.set({
        company_name: req.body.company_name,
        company_id: req.body.company_id,
        contact_No: req.body.contact_No,
        location: req.body.location,
      });

      await supplier.save();
      res.status(201).send(supplier);
    }
  }
);

router.get('/:company_name', async (req: Request, res: Response) => {
  const supplier = await Supplier.findOne({ company_name: req.params.company_name });
  if (!supplier) {
    res.status(400).send('Not available');
  }
  res.status(200).send(supplier);
});

router.delete('/:company_id', async (req: Request, res: Response) => {
  const supplier = await Supplier.findOne({ company_id: req.params.company_id });
  if (!supplier) {
    res.status(400).send('Not available');
  } else {
    await supplier.remove({ company_id: req.params.company_id });
    res.send('supplier with company_id : ' + req.params.company_id + ' successfully Removed');
  }
});

export { router as supplierRouter };
