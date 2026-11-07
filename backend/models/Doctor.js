const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    consultationFee: {
      type: Number,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
    },

    education: {
      type: String,
      required: true,
    },

    about: {
      type: String,
      default: "",
    },

    available: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
      default: "",
    },

    availableSlots: [
      {
        date: {
          type: String,
          required: true,
        },
        startTime: {
          type: String,
          required: true,
        },
        endTime: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);