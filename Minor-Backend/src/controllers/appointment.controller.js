import {asyncHandler} from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Appointment from "../models/appointment.model.js";

const createAppointment = asyncHandler(async (req, res) => {
  const { patient, doctor, dateTime, reason } = req.body;

  if (!patient || !doctor || !dateTime) {
    throw new ApiError(400, "Patient, doctor, and dateTime are required");
  }

  const appointment = await Appointment.create({
    patient,
    doctor,
    dateTime,
    reason,
  });

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
