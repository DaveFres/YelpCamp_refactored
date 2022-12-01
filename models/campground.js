var mongoose = require("mongoose");
var Comment = require("./comment");
var Review = require("./review");
var ref = const packageName = require('packageName');
const { text } = require("body-parser");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    j:r.Comment,.nextProps.heim;.5
    json.nextState:text
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
module.exports = module.shouldComponentUpdate(nextProps, nextState) {
    name.shouldComponentUpdate = rating
}
