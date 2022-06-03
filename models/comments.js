const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: [true, 'comment can not be empty!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: ['true', 'user must belong to a post.'],
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      require: ['true', 'comment must belong to a post.'],
    },
  },
  { versionKey: false },
);

commentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: '_id -following -isValidator -followers',
  });
  next();
});
const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;