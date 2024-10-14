const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    index: true,
  },
  phone: {
    type: String,
  },
}, {
  timestamps: true  // This adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model("Client", ClientSchema);
