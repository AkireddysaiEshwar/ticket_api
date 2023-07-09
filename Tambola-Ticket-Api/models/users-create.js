//import mongoose from "mongoose";

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passward: {
        type: String,
        required: true,
        minlength: 8,
    },
    users: [{
        type: mongoose.Types.objectId,
        ref: "user",
        required: true
    }],
});

export default mongoose.models("user", userSchema);