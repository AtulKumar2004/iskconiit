const mongoose = require("mongoose");

const sankirtanaRequestSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      whatsapp: String,

      email: {
        type: String,
        required: true,
      },

      location: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      programType: {
        type: String,
        required: true,
      },

      participants: {
        type: Number,
        required: true,
      },

      preferredDate: String,

      preferredTime: String,

      needKirtana: Boolean,

      needDiscourse: Boolean,

      needPrasadam: Boolean,

      requirements: String,

      source: String,
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "SankirtanaRequest",
  sankirtanaRequestSchema
);