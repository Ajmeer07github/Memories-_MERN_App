import mongoose from "mongoose";

const postSchema =new mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    // likeCount:{
    //     type:Number,
    //     default:0
    // },
    likes:{
        type: [String],
        default: [],
    },
    createdAt:{
        type: Date,
        default: new Date()
    },

});

var PostMessage = mongoose.model("PostMessage",postSchema);

export default PostMessage;