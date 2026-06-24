import mongoose from "mongoose";

const programRegistrationSchema = new mongoose.Schema({
  programType: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  formData: {
    type: Object,
    default: {},
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
  }
});

const ProgramRegistration = mongoose.model("ProgramRegistration", programRegistrationSchema);
export default ProgramRegistration;
