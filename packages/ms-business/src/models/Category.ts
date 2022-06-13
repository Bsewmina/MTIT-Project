import mongoose from "mongoose";


interface imageURL{
  url:string[];
}
interface CategoryAttributes {
  shopId: string;
  categoryCode: String;
  name: string;
  description: string;
  imageURLs: imageURL; 
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  lastItemId: String;
}

interface CategotyModel extends mongoose.Model<CategoryDoc> {
  build(attributes: CategoryAttributes): CategoryDoc;
}

interface CategoryDoc extends mongoose.Document {
  shopId: string;
  categoryCode: String;
  name: string;
  description: string;
  imageURLs: imageURL; 
  status: string;
  createdAt: Date;
  updatedAt: Date;
  isPublished: boolean;
  lastItemId: String;
}

const categorySchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: true,
    },
    categoryCode: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    imageURLs: {
      type: Array,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "Active"
        },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    lastItemId: {
      type: String,
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

categorySchema.statics.build = (attributes: CategoryAttributes) => {
  return new Category(attributes);
};

const Category = mongoose.model<CategoryDoc, CategotyModel>(
  "Category",
  categorySchema
);

export { Category };
