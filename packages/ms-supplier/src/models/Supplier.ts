import mongoose from 'mongoose';

interface SupplierAttributes {
  company_name: string;
  company_id: string;
  contact_No: number;
  location: string;
}

interface SupplierModel extends mongoose.Model<SupplierDoc> {
  build(attributes: SupplierAttributes): SupplierDoc;
}

interface SupplierDoc extends mongoose.Document {
  company_name: string;
  company_id: string;
  contact_No: number;
  location: string;
}

const SupplierSchema = new mongoose.Schema(
  {
    company_name: {
      type: String,
      required: true,
    },
    company_id: {
      type: String,
      require: true,
    },
    contact_No: {
      type: Number,
      required: true,
    },
    location: {
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

SupplierSchema.statics.build = (attributes: SupplierAttributes) => {
  return new Supplier(attributes);
};

const Supplier = mongoose.model<SupplierDoc, SupplierModel>('Supplier', SupplierSchema);

export { Supplier };
