import { asyncHandler } from '../utils/AsyncHandler.js' 
import { ApiError }  from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import Patient from '../models/patient.model.js'
import { sendMail } from '../utils/sendMail.js'

const createOrFindPatient = asyncHandler(async (req, res) => {
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

  let patient = await Patient.findOne({ phone });

  if (patient) {
    return res.status(200).json(
      new ApiResponse(200, {
        success: true,
        data: patient,
      }, "Existing patient returned")
    );
  }

  patient = await Patient.create({
    name,
    email,
    phone,
    age,
    gender,
    medicalHistory,
    emergencyContact,
  });

  if (patient?.email) {
    await sendMail({
      to: patient.email,
      subject: 'Welcome to Our Hospital',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 1rem; color: #333;">
          <h2>Patient Registration Successful</h2>
          <p>Dear ${patient.name},</p>

          <p>We’re happy to inform you that your profile has been successfully created in our hospital system.</p>

          <p>Your patient ID is: <strong>${patient.patientId}</strong></p>

          <p>You can now book appointments and receive medical care through our system.</p>

          <p style="margin-top: 2rem;">Warm regards,<br/>Hospital Administration Team</p>
        </div>
      `
    });
  }


  res.status(201).json(
    new ApiResponse(201, {
      success: true,
      data: patient,
    }, "Patient created successfully")
  );
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

const addVisitToPatient = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const visitData = req.body;
  
  if (!visitData.visitType || !visitData.amount) {
    throw new ApiError(400, "Visit type and amount are required");
  }

  const patient = await Patient.findById(id);
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  patient.visits.push(visitData);
  await patient.save();
  res.status(200).json(
    new ApiResponse(200, {
      success: true,
      data: patient,
    }, "Visit added successfully")
  );
});

const getPatientVisits = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findById(patientId).select('visits name phone');
  
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  res.status(200).json(
    new ApiResponse(200, {
      success: true,
      data: {
        patient: {
          name: patient.name,
          phone: patient.phone
        },
        visits: patient.visits
      },
    }, "Patient visits fetched successfully")
  );
});

const updateVisitPayment = asyncHandler(async (req, res) => {
  const { patientId, visitId } = req.params;
  const { amountPaid, paymentMethod, paymentDate, notes } = req.body;

  const patient = await Patient.findById(patientId);
  
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const visit = patient.visits.id(visitId);
  
  if (!visit) {
    throw new ApiError(404, "Visit not found");
  }

  visit.amountPaid = amountPaid || visit.amountPaid;
  visit.paymentMethod = paymentMethod || visit.paymentMethod;
  visit.paymentDate = paymentDate || visit.paymentDate;
  visit.notes = notes || visit.notes;

  visit.pendingAmount = visit.amount - visit.amountPaid;
  visit.paymentStatus = visit.pendingAmount <= 0 ? 'completed' : 'partial';

  await patient.save();

  res.status(200).json(
    new ApiResponse(200, {
      success: true,
      data: visit,
    }, "Visit payment updated successfully")
  );
});

const getPendingPayments = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  const patient = await Patient.findById(patientId).select('visits name phone');
  
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const pendingVisits = patient.visits.filter(visit => 
    visit.paymentStatus === 'pending' || visit.paymentStatus === 'partial'
  );

  const totalPending = pendingVisits.reduce((sum, visit) => 
    sum + (visit.pendingAmount || visit.amount), 0
  );

  res.status(200).json(
    new ApiResponse(200, {
      success: true,
      data: {
        patient: {
          name: patient.name,
          phone: patient.phone
        },
        pendingVisits,
        totalPendingAmount: totalPending
      },
    }, "Pending payments fetched successfully")
  );
});

const recordPayment = asyncHandler(async (req, res) => {
  const { patientId, visitId } = req.params;
  const { amountPaid, paymentMethod, paymentDate, notes } = req.body;

  if (!amountPaid || amountPaid <= 0) {
    throw new ApiError(400, "Valid payment amount is required");
  }

  const patient = await Patient.findById(patientId);
  
  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  const visit = patient.visits.id(visitId);
  
  if (!visit) {
    throw new ApiError(404, "Visit not found");
  }

  const currentPaid = visit.amountPaid || 0;
  const newAmountPaid = currentPaid + parseFloat(amountPaid);
  
  if (newAmountPaid > visit.amount) {
    throw new ApiError(400, "Payment amount exceeds the total visit amount");
  }

  visit.amountPaid = newAmountPaid;
  visit.pendingAmount = visit.amount - newAmountPaid;
  visit.paymentMethod = paymentMethod || visit.paymentMethod;
  visit.paymentDate = paymentDate || new Date();
  visit.notes = notes || visit.notes;

  if (visit.pendingAmount <= 0) {
    visit.paymentStatus = 'paid';
  } else if (visit.amountPaid > 0) {
    visit.paymentStatus = 'partial';
  }

  await patient.save();

  res.status(200).json(
    new ApiResponse(200, {
      success: true,
      data: {
        visit,
        paymentRecorded: amountPaid,
        totalPaid: newAmountPaid,
        remainingAmount: visit.pendingAmount
      },
    }, "Payment recorded successfully")
  );
});


export { 
    createOrFindPatient,
    searchPatient,
    getAllPatients,
    updatePatient,
    deletePatient,
    addVisitToPatient,
    getPatientVisits,
    updateVisitPayment,
    getPendingPayments,
    recordPayment
};