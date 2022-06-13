import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Category } from '../models/Category';
//import { BadRequestError, NotFoundError, validateRequest, requireAuth, currentUser } from '@infiniteam/common';
import { Item } from '../models/Item';
const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const category = await Category.find({});
  res.send(category);
});

// //get categories by shopId
// router.get('/shop', currentUser, requireAuth, async (req: Request, res: Response) => {
//   const shopId: string = req?.currentUser?.bizId!;
//   const category = await Category.find({ shopId: shopId });
//   if (!category) {
//     throw new NotFoundError();
//   }
//   res.send(category);
// });
// //get categories by shopId param
// router.get('/shop/:id', async (req: Request, res: Response) => {
//   const shopId: string = req.params.id;
//   const category = await Category.find({ shopId: shopId });
//   if (!category) {
//     throw new NotFoundError();
//   }
//   res.send(category);
// });

// //Check category
// router.get('/name/:name', currentUser, requireAuth, async (req: Request, res: Response) => {
//   const shopId: string = req?.currentUser?.bizId!;
//   let isAvailable = await Category.findOne({ name: req.params.name, shopId: shopId });
//   if (isAvailable) {
//     res.send({ message: 'Category already exists', available: false });
//   }
//   res.send({ message: 'Category available', available: true });
// });

// //Check category by category code
// router.get('/category-code-check/:categoryCode', currentUser, requireAuth, async (req: Request, res: Response) => {
//   const shopId: string = req?.currentUser?.bizId!;
//   let isAvailable = await Category.findOne({ categoryCode: req.params.categoryCode, shopId: shopId });
//   if (isAvailable) {
//     res.send({ message: 'Category already exists', available: false });
//   }
//   res.send({ message: 'Category available', available: true });
// });

// //Get lastitem id
// router.get('/get-last-item-id/:catId', currentUser, requireAuth, async (req: Request, res: Response) => {
//   const catid = await Category.findById(req.params.catId);
//   if (!catid) {
//     throw new NotFoundError();
//   }
//   res.send({ lastItemId: catid.lastItemId });
// });

// router.get('/:id', currentUser, requireAuth, async (req: Request, res: Response) => {
//   const category = await Category.findById(req.params.id);
//   if (!category) {
//     console.log('Category not found');
//     throw new NotFoundError();
//   }
//   res.send(category);
// });

//Create new category
router.post(
  '/',
  [
    body('name').not().isEmpty().withMessage('Please enter a category name.'),
    body('categoryCode').not().isEmpty().isLength({ min: 2, max: 10 }).withMessage('please enter a category Code'),
  ],

  async (req: Request, res: Response) => {
    //check if category already exists
    //const shopId: string = req?.currentUser?.bizId!;
    console.log('------------ online 1 --------');
    let isAvailable = await Category.findOne({ categoryCode: req.body.categoryCode });
    console.log('------------ online 2 --------');
    if (isAvailable) {
      console.log('Category Code already exists, Category code is not unique');
      throw new Error('Something went wrong');
    }
    console.log('------------ online 3 --------');
    const category = await Category.build({
      name: req.body.name,
      shopId: 'shopId',
      categoryCode: req.body.categoryCode,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastItemId: '0000',
      description: req.body.description,
      imageURLs: req.body.imageURLs,
      status: 'Active',
      isPublished: false,
    });

    try {
      await category.save();
    } catch (err) {
      console.log(err);
    }
    res.status(201).send(category);
  }
);

// router.delete('/:id', async (req: Request, res: Response) => {
//   const category = await Category.findOne({ _id: req.params.id });
//   if (!category) {
//     throw new NotFoundError();
//   }

//   //check items availability on category
//   const items = await Item.find({ category: category.id });

//   if (items.length > 0) {
//     throw new BadRequestError(items.length + ' Items already availble in this Category');
//   }

//   await Category.deleteOne({ _id: req.params.id });

//   res.send(category);
// });

// router.put(
//   '/:id',
//   currentUser,
//   requireAuth,
//   [
//     body('name').not().isEmpty().withMessage('Please enter a category name.'),
//     body('shopId').not().isEmpty().withMessage('Please enter a shop id.'),
//     body('categoryCode').not().isEmpty().isLength({ min: 4, max: 10 }).withMessage('Please enter a category Code'),
//   ],
//   validateRequest,
//   async (req: Request, res: Response) => {
//     const category = await Category.findById({ _id: req.params.id });
//     if (!category) {
//       throw new NotFoundError();
//     }

//     category.set({
//       name: req.body.name,
//       shopId: req.body.shopId,
//       categoryCode: req.body.categoryCode,
//       updatedAt: new Date(),
//       description: req.body.description,
//       isPublished: req.body.isPublished,
//     });

//     await category.save();
//     res.send(category);
//   }
// );

// // delete method to update staus as deleted
// router.delete(
//   '/delete-with-status/:id',
//   currentUser,
//   // requireAuth,
//   async (req: Request, res: Response) => {
//     const category = await Category.findOne({ _id: req.params.id });

//     if (!category) {
//       throw new NotFoundError();
//     }
//     category.set({
//       status: 'Deleted',
//       updatedAt: new Date(),
//     });
//     await category.save();
//     res.status(200).send(category);
//   }
// );

// TODO make status active -> ../status-active/:id

export { router as categoryRouter };
