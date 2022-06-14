import mongoose from 'mongoose';

interface OrderAttributes {
  order_total: number;
  order_itemcount: number;
  book_name: string;
  unit_price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attributes: OrderAttributes): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
  order_total: number;
  order_itemcount: number;
  book: string;
  unit_price: number;
}

const OrderSchema = new mongoose.Schema(
  {
    order_total: {
      type: Number,
      required: true,
    },
    order_itemcount: {
      type: Number,
      require: true,
    },
    book_name: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
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

OrderSchema.statics.build = (attributes: OrderAttributes) => {
  return new Order(attributes);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', OrderSchema);

export { Order };
