import {asyncHandler} from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Appointment from "../models/appointment.model.js";
import { sendMail } from "../utils/sendMail.js";
import Patient from "../models/patient.model.js";
import  { User } from  '../models/user.model.js'

const createAppointment = asyncHandler(async (req, res) => {
  const { patient, doctor, dateTime, reason } = req.body;

  if (!patient || !doctor || !dateTime) {
    throw new ApiError(400, "Patient, doctor, and dateTime are required");
  }
  
  const appointmentDateTime = new Date(dateTime);

  const oneHourBefore = new Date(appointmentDateTime.getTime() - 60 * 60 * 1000);
  const oneHourAfter = new Date(appointmentDateTime.getTime() + 60 * 60 * 1000);

  const existingAppointment = await Appointment.findOne({
    doctor,
    dateTime: {
      $gte: oneHourBefore,
      $lte: oneHourAfter, 
    },
    status: "confirmed"
  });

  if (existingAppointment) {
    throw new ApiError(409, "The doctor already has a confirmed appointment within 1 hour of this time. Please choose another slot.");
  }

  const appointment = await Appointment.create({
    patient,
    doctor,
    dateTime,
    reason,
  });

  const patientDetails = await Patient.findById(patient);
  const doctorDetails = await User.findById(doctor);  
  
  if (patientDetails?.email) {
    
    const formattedDate = new Date(dateTime).toLocaleString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    await sendMail({
      to: patientDetails.email,
      subject: 'Appointment Created (Pending Confirmation)',
      html: `
        <p>Dear ${patientDetails.name},</p>
        <p>Your appointment with <strong>Dr. ${doctorDetails.name}</strong> on <strong>${formattedDate}</strong> has been <strong>${appointment.status}</strong>.</p>
        <p>We will notify you once the status is updated.</p>
      `
    });
  }
  
  return res
    .status(201)
    .json(new ApiResponse(201, appointment, "Appointment created successfully"));
});

const getAppointments = asyncHandler(async (req, res) => {
  const { doctorId, patientId } = req.query;

  let filter = {};
  if (doctorId) filter.doctor = doctorId;
  if (patientId) filter.patient = patientId;

  const appointments = await Appointment.find(filter)
    .populate("patient", "-password")
    .populate("doctor", "-password")
    .sort({ dateTime: 1 });

  return res
    .status(200)
    .json(new ApiResponse(200, appointments, "Appointments fetched successfully"));
});

const deleteAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  await appointment.remove();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Appointment deleted successfully"));
});

const updateAppointment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { dateTime, status, reason, paymentStatus } = req.body;

  const appointment = await Appointment.findById(id);
  if (!appointment) {
    throw new ApiError(404, "Appointment not found");
  }

  if (dateTime) appointment.dateTime = dateTime;
  if (status) appointment.status = status;
  if (reason) appointment.reason = reason;
  if (paymentStatus) appointment.paymentStatus = paymentStatus;

  await appointment.save();

  if (status === 'confirmed' || status === 'cancelled') {
    const patientDetails = await Patient.findById(appointment.patient);
    const doctorDetails = await User.findById(appointment.doctor);

    if (patientDetails?.email) {
      const formattedDate = new Date(appointment.dateTime).toLocaleString('en-US', { 
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

      const isConfirmed = status === 'confirmed';

      await sendMail({
        to: patientDetails.email,
        subject: `Appointment ${status.charAt(0).toUpperCase() + status.slice(1)}`,
        html: `
          <p>Dear ${patientDetails.name},</p>
          <p>Your appointment with <strong>Dr. ${doctorDetails.name}</strong> on <strong>${formattedDate}</strong> has been <strong>${status}</strong>.</p>
          ${
            isConfirmed
              ? `<p>We look forward to seeing you. Please arrive on time.</p>`
              : `<p>We regret to inform you that the appointment was cancelled. You can rebook a slot anytime.</p>`
          }
        `
      });
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, appointment, "Appointment updated successfully"));
});


export {
  createAppointment,
  getAppointments,
  deleteAppointment,
  updateAppointment
};
