const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    body: {
        type: String,
        require: true,
    },
    tags: [{
        type: String,
        require: true,
    }],
    rating: {
        type: Number,
        require: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    }
});

module.exports = Data = mongoose.model('post', PostSchema);