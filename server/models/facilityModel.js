const mongoose = require('mongoose')

const goalSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    lga: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    long: {
      type: Number,
      required: [true, 'Please add a text value'],
    },
    lat: {
      type: Number,
      required: [true, 'Please add a text value'],
    },
    
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Facilities', goalSchema)