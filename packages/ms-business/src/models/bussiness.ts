import mongoose from 'mongoose';
import {Password} from '../services/password';

// An interface that describes the properties
// that are required to create a new User

interface tps{
  tnumber:number[];
}

interface UserAttributes {
  firstName: string;
  owner_id:string;
  address:string;
  email: string;
  password: string;
  phone_no:tps;
  status:string;
}

// An interface that describes the properties
// that a User model has

interface UserModel extends mongoose.Model<UserDoc>{
  build(attributes: UserAttributes):UserDoc;
}

// An interface that describes the properties 
// that a User Document has

interface UserDoc extends mongoose.Document{
  firstName: string;
  owner_id:string;
  address:string;
  email: string;
  password: string;
  phone_no:tps;
  status:string;
}


  const bussinessSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    owner_id:{
      type: String,
      required: true,
    },
    address:{
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_no:{
      type: Number,
      required: true,
    },
    status:{
      type: String,
      required: true,
    }
  },
  
  {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;

        }
    }
  }
);

bussinessSchema.pre('save',async function(done){
  if(this.isModified('password')){
      const hashedPassword = await Password.toHash(this.get('password'));
      this.set('password',hashedPassword);    
  }
  done();
})

bussinessSchema.statics.build = (attributes: UserAttributes) => {
  return new Users(attributes);
};

const Users = mongoose.model<UserDoc,UserModel>('Bussiness', bussinessSchema);

export { Users };
