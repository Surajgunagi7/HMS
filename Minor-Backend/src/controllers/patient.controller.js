import { asyncHandler } from '../utils/asyncHandler.js' 
import { ApiError }  from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import Patient from '../models/patient.model.js'


const createPatient = asyncHandler(async (req, res) => {
    const {
      name,
      email,
      phone,
      age,
      gender,
      medicalHistory,
      emergencyContact,
    } = req.body;
  
    if (!name || !phone) {
      throw new ApiError(400, "Name and phone are required.");
    }
  
    const existedPatient = await Patient.findOne({
      $or: [{ phone }],
    });
  
    if (existedPatient) {
      throw new ApiError(409, "Patient with this email or phone already exists.");
    }
  
    const newPatient = await Patient.create({
      name,
      email,
      phone,
      age,
      gender,
      medicalHistory,
      emergencyContact,
    });
  
    res.status(201).json(new ApiResponse(201, {
        success: true,
        data: newPatient,
      },"Patient created successfully"));
});

const searchPatient = asyncHandler(async (req, res) => {
  const { name, phone } = req.query;

  if (!name && !phone) {
    throw new ApiError(400, "Please provide at least a name or phone to search.");
  }

  const filter = {};
  if (name) filter.name = new RegExp(name, "i");
  if (phone) filter.phone = phone;

  const patients = await Patient.find(filter).select("-__v");

  if (patients.length === 0) {
    throw new ApiError(404, "No patients found with the given information.");
  }

  res.status(200).json(
    new ApiResponse(200, {
      success: true,
      data: patients,
    }, "Patient(s) found successfully")
  );
});

const getAllPatients = asyncHandler(async (req, res) => {
    const patients = await Patient.find().select("-__v");
  
    res.status(200).json(
      new ApiResponse(200, {
        success: true,
        data: patients,
      }, "All patients fetched successfully")
    );
});
  
// const getPatientById = asyncHandler(async (req, res) => {
//     const { id } = req.params;
  
//     const patient = await Patient.findById(id).select("-__v");
  
//     if (!patient) {
//       throw new ApiError(404, "Patient not found.");
//     }
  
//     res.status(200).json(
//       new ApiResponse(200, {
//         success: true,
//         data: patient,
//       }, "Patient fetched successfully")
//     );
// });
  
const updatePatient = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const updatedData = req.body;
  
    const updatedPatient = await Patient.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    }).select("-__v");
  
    if (!updatedPatient) {
      throw new ApiError(404, "Patient not found.");
    }
  
    res.status(200).json(
      new ApiResponse(200, {
        success: true,
        data: updatedPatient,
      }, "Patient updated successfully")
    );
});
  
const deletePatient = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    const deletedPatient = await Patient.findByIdAndDelete(id);
  
    if (!deletedPatient) {
      throw new ApiError(404, "Patient not found.");
    }
  
    res.status(200).json(
      new ApiResponse(200, {
        success: true,
        data: deletedPatient,
      }, "Patient deleted successfully")
    );
});

  
export { 
    createPatient,
    searchPatient,
    getAllPatients,
    // getPatientById,
    updatePatient,
    deletePatient
};