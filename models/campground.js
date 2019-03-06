var mongoose = require("mongoose");
var Comment = require("./comment");
var Review = require("./review");


var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    createdAt: { type: Date, default: Date.now},
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
   price: String
});

module.exports = mongoose.model("Campground", campgroundSchema);