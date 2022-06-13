import mongoose from 'mongoose';


interface StockDataAttributes {
    bizId: string; // business id -> required
    stockInType: string;//Return , direct purchase, transfer in  required
    userId: string; // user id -> handled by  required take it from session
    stockStorageType: string; // shop,vehicle,ware house -> required
    stockStorageId: string; // shop id, vehicle id, ware house id -> required
    status: string // canceled , completed, pending, draft required
    referenceId: string; // reference id -> if from a supplier supplier id, if from a return return id, if from a transfer in transfer id -> required
    createdAt: Date;
    updatedAt: Date;
}

interface StockDataModel extends mongoose.Model<StockDataDoc> {
    build(attributes: StockDataAttributes): StockDataDoc;
}


interface StockDataDoc extends mongoose.Document {
    bizId: string; // business id -> required
    stockInType: string;//Return , direct purchase, transfer in  required
    userId: string; // user id -> handled by  required take it from session
    stockStorageType: string; // shop,vehicle,ware house -> required
    stockStorageId: string; // shop id, vehicle id, ware house id -> required
    status: string // canceled , completed, pending, draft required
    referenceId: string; // reference id -> if from a supplier supplier id, if from a return return id, if from a transfer in transfer id -> required
    createdAt: Date;
    updatedAt: Date;
}

const StockDataSchema = new mongoose.Schema({
    bizId: {
        type: String,
        required: true
    },
    stockInType: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    stockStorageType: {
        type: String,
        required: true
    },
    stockStorageId: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

StockDataSchema.statics.build = (attributes: StockDataAttributes) => {
    return new StockData(attributes);
};

const StockData = mongoose.model<StockDataDoc, StockDataModel>('StockData', StockDataSchema);

export { StockData };
