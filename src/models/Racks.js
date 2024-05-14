import { Schema, model, models } from 'mongoose';

const racksSchema = new Schema({
    rack: {
        type: String,
        required: true,
        unique: true
    },
    records: {
        type: Array,
        required: true
    }
})

const Racks = models.racks || model("racks", racksSchema);

export default Racks;