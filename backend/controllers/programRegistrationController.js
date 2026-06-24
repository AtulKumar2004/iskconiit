import ProgramRegistration from "../models/ProgramRegistration.js";

export const registerProgram = async (req, res) => {
  try {
    const { programType, fullName, email, phone, city, state, formData } = req.body;

    if (!programType || !fullName || !email || !phone || !city || !state) {
      return res.status(400).json({ success: false, message: "Missing required common fields." });
    }

    const registration = new ProgramRegistration({
      programType,
      fullName,
      email,
      phone,
      city,
      state,
      formData,
      ipAddress: req.ip || req.connection.remoteAddress
    });

    await registration.save();

    res.status(201).json({
      success: true,
      message: "Registration submitted successfully"
    });
  } catch (error) {
    console.error("Program Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to submit your request. Please try again later."
    });
  }
};
