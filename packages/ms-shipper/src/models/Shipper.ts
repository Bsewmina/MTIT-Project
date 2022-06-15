import mongoose from "mongoose";

interface ShipperAttributes {
  tracking_id: string;
  shipper_phone: number;
  company_name: string;
}

interface ShipperModel extends mongoose.Model<ShipperDoc> {
  build(attributes: ShipperAttributes): ShipperDoc;
}

interface ShipperDoc extends mongoose.Document {
  tracking_id: string;
  shipper_phone: number;
  company_name: string;
}

const ShipperSchema = new mongoose.Schema(
  {
    tracking_id: {
      type: String,
      required: true,
    },
    shipper_phone: {
      type: Number,
      require: true,
    },
    company_name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

ShipperSchema.statics.build = (attributes: ShipperAttributes) => {
  return new Shipper(attributes);
};

const Shipper = mongoose.model<ShipperDoc, ShipperModel>(
  "Shipper",
  ShipperSchema
);

export { Shipper };
