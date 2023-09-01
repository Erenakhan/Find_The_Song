const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointSchema = new Schema({
    name: {
      type: String,
      required: true,
    },

    point:{
        type: Number,
        required: true,
    },
    mongooseType:{
      type: String,
      required: true,
    }
  }, {
    timestamps: true,
  });

  const Point = mongoose.model('Point', pointSchema);

  module.exports = Point;