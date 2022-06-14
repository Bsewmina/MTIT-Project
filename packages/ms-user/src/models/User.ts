import mongoose from 'mongoose';

interface UserAttributes {
  user_name: string;
  user_address: string;
  user_phone: number;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

interface UserDoc extends mongoose.Document {
  user_name: string;
  user_address: string;
  user_phone: number;
}

const UserSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    user_address: {
      type: String,
      require: true,
    },
    user_phone: {
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

UserSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export { User };
