import mongoose from "mongoose";

//schema
const noteSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    },
    { timestamps: true } //creates createdAt and updatedAt fields
);

//model
const Note = mongoose.model("Note", noteSchema);

export default Note;