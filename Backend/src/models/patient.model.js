import mongoose, { Schema } from "mongoose";
import validator from "validator";

const HOSPITAL_ID = "HMS";

const visitSchema = new Schema({
  visitDate: {
    type: Date,
    default: Date.now
  },
  visitType: {
    type: String,
    enum: ["appointment", "emergency", "walk-in"],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "pending", "partial"],
    default: "paid"
  },
  notes: {
    type: String
  }
}, { timestamps: true });

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
    },
      visits: [visitSchema],
    totalVisits: {
      type: Number,
      default: 0
    },
    totalRevenue: {
      type: Number,
      default: 0
    },
    lastVisit: {
      type: Date
    }
  },
  { timestamps: true }
);

patientSchema.pre("save", function(next) {
  if (this.visits && this.visits.length > 0) {
    this.totalVisits = this.visits.length;
    this.totalRevenue = this.visits.reduce((total, visit) => total + visit.amount, 0);
    this.lastVisit = this.visits[this.visits.length - 1].visitDate;
  }
  next();
});

patientSchema.pre("validate", async function (next) {
    if (!this.patientId) {
      const year = new Date().getFullYear().toString().slice(-2);
      const randomNum = Math.floor(1000 + Math.random() * 9000); 
      this.patientId = `${HOSPITAL_ID}${year}${randomNum}`;
    }
    next();
  });

patientSchema.methods.addVisit = function(visitData) {
  this.visits.push(visitData);
  return this.save();
};

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;