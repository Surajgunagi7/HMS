import asyncHandler from "express-async-handler";
import Appointment from "../models/appointment.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Patient from "../models/patient.model.js";
import User from "../models/user.model.js"; 
import moment from "moment";
import nodemailer from 'nodemailer';


const getTodayDateRange = () => {
    const startOfDay = moment().startOf('day').toDate(); // Start of today (00:00:00)
    const endOfDay = moment().endOf('day').toDate(); // End of today (23:59:59)
    
    return { startOfDay, endOfDay };
};
const sendAppointmentConfirmationEmail = async (patientEmail, doctorName, appointmentTime) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other email services like SendGrid
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
  
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: patientEmail,
      subject: 'Appointment Confirmation',
      text: `Your appointment with Dr. ${doctorName} is scheduled for ${appointmentTime}.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Error sending email:', err);
    }
};


const createAppointment = asyncHandler(async (req, res) => {
  const { patient, doctor, dateTime, reason } = req.body;

  if (!patient || !doctor || !dateTime) {
    throw new ApiError(400, "Patient, doctor, and date/time are required.");
  }

  const existingPatient = await Patient.findById(patient);
  if (!existingPatient) {
    throw new ApiError(404, "Patient not found.");
  }

  const existingDoctor = await User.findById(doctor);
  if (!existingDoctor || existingDoctor.role !== "doctor") {
    throw new ApiError(404, "Doctor not found.");
  }

  // check for overlapping appointments

  const newAppointment = await Appointment.create({
    patient,
    doctor,
    dateTime,
    reason,
  });

  await sendAppointmentConfirmationEmail(
    patient.email,
    doctor.name,
    appointment.dateTime
  );  

  res.status(201).json(
    new ApiResponse(201, {
      success: true,
      data: newAppointment,
    }, "Appointment created successfully")
  );
});

const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    const { status } = req.body;
  
    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      throw new ApiError(400, "Invalid status.");
    }
  
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      throw new ApiError(404, "Appointment not found.");
    }
  
    appointment.status = status;
    await appointment.save();
  
    res.status(200).json(
      new ApiResponse(200, { success: true, data: appointment }, "Appointment status updated successfully")
    );
});

const updateAppointmentDetails = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    const { reason, doctor } = req.body;
  
    const appointment = await Appointment.findById(appointmentId);
  
    if (!appointment) {
      throw new ApiError(404, "Appointment not found.");
    }
  
    if (reason) {
      appointment.reason = reason;
    }
  
    if (doctor) {
      const existingDoctor = await User.findById(doctor);
      if (!existingDoctor || existingDoctor.role !== "doctor") {
        throw new ApiError(404, "Doctor not found.");
      }
      appointment.doctor = doctor;
    }
  
    await appointment.save();
  
    res.status(200).json(
      new ApiResponse(200, { success: true, data: appointment }, "Appointment details updated successfully")
    );
});

const rescheduleAppointment = asyncHandler(async (req, res) => {
    const { appointmentId } = req.params;
    const { dateTime } = req.body;
  
    if (!dateTime) {
      throw new ApiError(400, "Date/time is required.");
    }
  
    const appointment = await Appointment.findById(appointmentId);
  
    if (!appointment) {
      throw new ApiError(404, "Appointment not found.");
    }
  
    appointment.dateTime = dateTime;
    await appointment.save();
  
    res.status(200).json(
      new ApiResponse(200, { success: true, data: appointment }, "Appointment rescheduled successfully")
    );
});

const getAppointments = asyncHandler(async (req, res) => {
    const { patientName, patientId, status } = req.query; // Query parameters from frontend search
  
    let filter = {};
  
    // Filter by patient name or patient ID (if provided)
    if (patientName) {
      const patient = await Patient.findOne({ name: patientName });
      if (patient) {
        filter.patient = patient._id; // Match appointments based on patient ID
      } else {
        throw new ApiError(404, "Patient not found with the given name.");
      }
    }
  
    if (patientId) {
      filter.patient = patientId; // Match appointments by patient ID
    }
  
    // Filter by appointment status (if provided)
    if (status && ["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      filter.status = status;
    }
  
    // Fetch appointments with the applied filters
    const appointments = await Appointment.find(filter)
      .populate("patient", "name phone") // You can add more fields if necessary
      .populate("doctor", "name specialty") // Populate doctor details
      .exec();
  
    res.status(200).json(
      new ApiResponse(200, { success: true, data: appointments }, "Appointments fetched successfully")
    );
});
  
const getTodayAppointments = asyncHandler(async (req, res) => {
    const { startOfDay, endOfDay } = getTodayDateRange();
    
    // Fetch all appointments for today
    const appointments = await Appointment.find({
      dateTime: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("patient", "name phone")
      .populate("doctor", "name specialty");
  
    res.status(200).json(
      new ApiResponse(200, { success: true, data: appointments }, "Today's appointments fetched successfully")
    );
});

const getTodayAppointmentsForDoctor = asyncHandler(async (req, res) => {
    const doctorId = req.user._id;  // Assuming the doctor's ID comes from authentication (JWT or session)
    const { startOfDay, endOfDay } = getTodayDateRange();
  
    // Fetch all appointments for the doctor today
    const appointments = await Appointment.find({
      doctor: doctorId,
      dateTime: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate("patient", "name phone")
      .populate("doctor", "name specialty");
  
    if (!appointments.length) {
      return res.status(404).json(new ApiResponse(404, { success: false }, "No appointments for today"));
    }
  
    res.status(200).json(
      new ApiResponse(200, { success: true, data: appointments }, "Today's appointments for the doctor fetched successfully")
    );
});

const cancelAppointment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);
  
    if (!appointment) {
      return res.status(404).json(new ApiResponse(404, { success: false }, "Appointment not found"));
    }
  
    appointment.status = 'cancelled';
    await appointment.save();
    
    res.status(200).json(new ApiResponse(200, { success: true }, "Appointment cancelled successfully"));
});

export { 
    createAppointment,
    updateAppointmentStatus,
    updateAppointmentDetails,
    rescheduleAppointment,
    getAppointments,
    getTodayAppointments,
    getTodayAppointmentsForDoctor,
    cancelAppointment
};
