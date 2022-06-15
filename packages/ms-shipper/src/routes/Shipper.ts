import express, { Request, Response } from "express";
import { body } from "express-validator";
import { Shipper } from "../models/Shipper";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const shipper = await Shipper.find({});
  res.send(shipper);
});

router.get("/:tracking_id", async (req: Request, res: Response) => {
  const shipper = await Shipper.findOne({ user_name: req.params.user_name });
  if (!shipper) {
    res.status(400).send("Not available");
  }
  res.status(200).send(shipper);
});

router.post(
  "/",
  [
    body("tracking_id")
      .not()
      .isEmpty()
      .withMessage("Please enter the tracking_id"),
    body("shipper_phone")
      .not()
      .isEmpty()
      .withMessage("please enter the phone number"),
    body("company_name")
      .not()
      .isEmpty()
      .withMessage("Please enter company name"),
  ],
  async (req: Request, res: Response) => {
    let isAvailable = await Shipper.findOne({ user_name: req.body.user_name });

    if (isAvailable) {
      res.status(400).send("Shipper already exists");
    } else {
      const shipper = await Shipper.build({
        tracking_id: req.body.tracking_id,
        shipper_phone: req.body.shipper_phone,
        company_name: req.body.company_name,
      });

      try {
        await shipper.save();
      } catch (err) {
        console.log(err);
      }
      res.status(201).send(shipper);
    }
  }
);

router.put(
  "/:id",
  [
    body("tracking_id")
      .not()
      .isEmpty()
      .withMessage("Please enter the tracking_id"),
    body("shipper_phone")
      .not()
      .isEmpty()
      .withMessage("please enter the phone number"),
    body("company_name")
      .not()
      .isEmpty()
      .withMessage("Please enter company name"),
  ],

  async (req: Request, res: Response) => {
    const shipper = await Shipper.findOne({ user_name: req.params.user_name });
    if (!shipper) {
      res.status(400).send("Not available");
    } else {
      shipper.set({
        tracking_id: req.body.tracking_id,
        shipper_phone: req.body.shipper_phone,
        company_name: req.body.company_name,
      });

      await shipper.save();
      res.status(201).send(shipper);
    }
  }
);

router.delete("/:id", async (req: Request, res: Response) => {
  const shipper = await Shipper.findOne({ user_name: req.params.user_name });
  if (!shipper) {
    res.status(400).send("Not available");
  } else {
    await shipper.remove({ shipper_name: req.params.user_name });
    res.send(
      "shipper with id : " + req.params.user_name + " successfully Removed"
    );
  }
});

export { router as shipperRouter };
