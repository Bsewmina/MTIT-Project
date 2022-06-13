import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  BadRequestError,
  validateRequest,
  currentUser,
  requireAuth,
  NotFoundError,
} from "@infiniteam/common";
import { StockData } from "../models/StockData";

const router = express.Router();

router.get(
  "/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const stock = await StockData.findById(req.params.id);

    if (!stock) {
      throw new NotFoundError();
    }

    res.send(stock);
  }
);

router.post(
  "/",
  currentUser,
  requireAuth,
  [
    body("bizId").not().isEmpty().withMessage("Please enter business ID"),
    body("stockInType")
      .not()
      .isEmpty()
      .withMessage("Please enter stock in type"),
    body("userId").not().isEmpty().withMessage("Plese enter user ID"),
    body("stockStorageType")
      .not()
      .isEmpty()
      .withMessage("Plese enter storage type"),
    body("stockStorageId")
      .not()
      .isEmpty()
      .withMessage("Please enter stock storage ID"),
    body("status").not().isEmpty().withMessage("Please select status"),
    body("referenceId").not().isEmpty().withMessage("Please add reference ID"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const stock = StockData.build({
      bizId: req.body.bizid,
      stockInType: req.body.stockintype,
      userId: req.body.userid,
      stockStorageType: req.body.stockstoragetype,
      stockStorageId: req.body.stockstorageid,
      status: req.body.status,
      referenceId: req.body.referenceid,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await stock.save();
    res.status(201).send(stock);
  }
);

router.put(
  "/:id",
  currentUser,
  requireAuth,
  [
    body("bizId").not().isEmpty().withMessage("Please enter business ID"),
    body("stockInType")
      .not()
      .isEmpty()
      .withMessage("Please enter stock in type"),
    body("userId").not().isEmpty().withMessage("Plese enter user ID"),
    body("stockStorageType")
      .not()
      .isEmpty()
      .withMessage("Plese enter storage type"),
    body("stockStorageId")
      .not()
      .isEmpty()
      .withMessage("Please enter stock storage ID"),
    body("status").not().isEmpty().withMessage("Please select status"),
    body("referenceId").not().isEmpty().withMessage("Please add reference ID"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const existingStock = await StockData.findById(req.params.id);

    if (!existingStock) {
      throw new NotFoundError();
    }

    existingStock.set({
      bizId: req.body.bizid,
      stockInType: req.body.stockintype,
      userId: req.body.userid,
      stockStorageType: req.body.stockstoragetype,
      stockStorageId: req.body.stockstorageid,
      status: req.body.status,
      referenceId: req.body.referenceid,
      updatedAt: new Date(),
    });

    await existingStock.save();
    res.status(201).send(existingStock);
  }
);

router.delete(
  "/:id",
  currentUser,
  requireAuth,
  async (req: Request, res: Response) => {
    const existingStock = await StockData.findById(req.params.id);

    if (!existingStock) {
      throw new NotFoundError();
    }

    await existingStock.remove({ _id: req.params.id });
    res.send(existingStock);
  }
);

export { router as stockDataRouter };
