import mongoose, { Schema } from "mongoose";
import validator from "validator";

const HOSPITAL_ID = "HMS";

const patientSchema = new Schema(
  {
    patientId: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      sparse: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"], 
    },
    phone: {
      type: String,
      required: true,
    },
    medicalHistory: {
      type: String,
    },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    }
  },
  { timestamps: true }
);

patientSchema.pre("validate", async function (next) {
    if (!this.patientId) {
      const year = new Date().getFullYear().toString().slice(-2);
      const randomNum = Math.floor(1000 + Math.random() * 9000); 
      this.patientId = `${HOSPITAL_ID}${year}${randomNum}`;
    }
    next();
  });

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
