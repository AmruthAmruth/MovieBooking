import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    playTime: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    director: {
        type: String, 
        required: true
    },
    production: {
        type: [String], 
        required: true
    }, 
    actors: {
        type: [String], 
        required: true
    },
    posterUrl:{
        type:String,
        require:true
    }
});

export default mongoose.model("Movie", movieSchema);
