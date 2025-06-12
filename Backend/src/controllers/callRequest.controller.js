import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { CallRequest } from '../models/callRequest.model.js';

const createCallRequest = asyncHandler(async (req, res) => {
  const { name, email, phone, reason } = req.body;

  if (!name || !phone || !reason) {
    throw new ApiError(400, "Name, phone, and reason are required.");
  }

  const callRequest = await CallRequest.create({
    name,
    email,
    phone,
    reason,
  });

  res.status(201).json(
    new ApiResponse(201, { success: true, data: callRequest }, "Call request created")
  );
});

const getCallRequests = asyncHandler(async (req, res) => {
  const { status } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const requests = await CallRequest.find(filter)
    .populate("handledBy", "name role email") 
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, { success: true, data: requests }, "Call requests fetched")
  );
});

const attendCallRequest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const request = await CallRequest.findById(id);
  if (!request) throw new ApiError(404, "Call request not found");

  if (request.status === "completed") {
    return res.status(200).json(
      new ApiResponse(200, { success: true, data: request }, "Already marked as attended")
    );
  }

  request.status = "completed";
  request.handledBy = req.user?._id || null;
  request.handledAt = new Date();

  await request.save();

  res.status(200).json(
    new ApiResponse(200, { success: true, data: request }, "Call request marked as attended")
  );
});

export {
  createCallRequest,
  getCallRequests,
  attendCallRequest
};
