import { User } from "../models/user.model.js";
import Patient from "../models/patient.model.js";
import Appointment from "../models/appointment.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getDashboardStats = asyncHandler(async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await User.countDocuments({ role: "doctor" });
    const totalAppointments = await Appointment.countDocuments();
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayAppointments = await Appointment.countDocuments({
      dateTime: {
        $gte: today,
        $lt: tomorrow
      }
    });

    const pendingAppointments = await Appointment.countDocuments({
      status: "pending"
    });

    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);
    
    const monthlyRevenue = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $match: {
          "visits.visitDate": { $gte: currentMonth },
          "visits.paymentStatus": "paid"
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$visits.amount" }
        }
      }
    ]);

    const newPatientsThisMonth = await Patient.countDocuments({
      createdAt: { $gte: currentMonth }
    });

    res.status(200).json(
      new ApiResponse(200, {
        totalPatients,
        totalDoctors,
        totalAppointments,
        todayAppointments,
        pendingAppointments,
        monthlyRevenue: monthlyRevenue[0]?.totalRevenue || 0,
        newPatientsThisMonth
      }, "Dashboard statistics retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error fetching dashboard statistics");
  }
});

const getAppointmentAnalytics = asyncHandler(async (req, res) => {
  try {
    const statusDistribution = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrends = await Appointment.aggregate([
      {
        $match: {
          dateTime: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$dateTime" },
            month: { $month: "$dateTime" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyAppointments = await Appointment.aggregate([
      {
        $match: {
          dateTime: { $gte: weekStart }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: "$dateTime" },
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$dateTime"
              }
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.dayOfWeek": 1 }
      }
    ]);

    const topDoctors = await Appointment.aggregate([
      {
        $group: {
          _id: "$doctor",
          appointmentCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "doctorInfo"
        }
      },
      {
        $unwind: "$doctorInfo"
      },
      {
        $project: {
          doctorName: "$doctorInfo.name",
          specialization: "$doctorInfo.specialization",
          appointmentCount: 1
        }
      },
      {
        $sort: { appointmentCount: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.status(200).json(
      new ApiResponse(200, {
        statusDistribution,
        monthlyTrends,
        weeklyAppointments,
        topDoctors
      }, "Appointment analytics retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error fetching appointment analytics");
  }
});

const getPatientAnalytics = asyncHandler(async (req, res) => {
  try {
    const ageDistribution = await Patient.aggregate([
      {
        $match: { age: { $exists: true, $ne: null } }
      },
      {
        $bucket: {
          groupBy: "$age",
          boundaries: [0, 18, 30, 45, 60, 100],
          default: "Unknown",
          output: {
            count: { $sum: 1 }
          }
        }
      }
    ]);

    const genderDistribution = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 }
        }
      }
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const registrationTrends = await Patient.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const topPatients = await Patient.find()
      .sort({ totalVisits: -1 })
      .limit(10)
      .select('name totalVisits totalRevenue lastVisit');

    const visitTypeDistribution = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $group: {
          _id: "$visits.visitType",
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json(
      new ApiResponse(200, {
        ageDistribution,
        genderDistribution,
        registrationTrends,
        topPatients,
        visitTypeDistribution
      }, "Patient analytics retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error fetching patient analytics");
  }
});

const getRevenueAnalytics = asyncHandler(async (req, res) => {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyRevenue = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $match: {
          "visits.visitDate": { $gte: twelveMonthsAgo },
          "visits.paymentStatus": "paid"
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$visits.visitDate" },
            month: { $month: "$visits.visitDate" }
          },
          revenue: { $sum: "$visits.amount" },
          visitCount: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const revenueByVisitType = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $match: {
          "visits.paymentStatus": "paid"
        }
      },
      {
        $group: {
          _id: "$visits.visitType",
          revenue: { $sum: "$visits.amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const paymentStatusDistribution = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $group: {
          _id: "$visits.paymentStatus",
          count: { $sum: 1 },
          totalAmount: { $sum: "$visits.amount" }
        }
      }
    ]);

    const topRevenuePatients = await Patient.find()
      .sort({ totalRevenue: -1 })
      .limit(10)
      .select('name totalRevenue totalVisits');

    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const dailyRevenue = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $match: {
          "visits.visitDate": { $gte: currentMonth },
          "visits.paymentStatus": "paid"
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$visits.visitDate"
            }
          },
          revenue: { $sum: "$visits.amount" },
          visitCount: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    res.status(200).json(
      new ApiResponse(200, {
        monthlyRevenue,
        revenueByVisitType,
        paymentStatusDistribution,
        topRevenuePatients,
        dailyRevenue
      }, "Revenue analytics retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error fetching revenue analytics");
  }
});

const getDoctorAnalytics = asyncHandler(async (req, res) => {
  try {
    const availabilityStatus = await User.aggregate([
      {
        $match: { role: "doctor" }
      },
      {
        $group: {
          _id: "$available",
          count: { $sum: 1 }
        }
      }
    ]);

    const specializationDistribution = await User.aggregate([
      {
        $match: { 
          role: "doctor",
          specialization: { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$specialization",
          count: { $sum: 1 }
        }
      }
    ]);

    const doctorPerformance = await User.aggregate([
      {
        $match: { role: "doctor" }
      },
      {
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "doctor",
          as: "appointments"
        }
      },
      {
        $project: {
          name: 1,
          specialization: 1,
          consultationFee: 1,
          available: 1,
          totalAppointments: { $size: "$appointments" },
          completedAppointments: {
            $size: {
              $filter: {
                input: "$appointments",
                cond: { $eq: ["$$this.status", "completed"] }
              }
            }
          },
          potentialRevenue: {
            $multiply: [
              "$consultationFee",
              {
                $size: {
                  $filter: {
                    input: "$appointments",
                    cond: { $eq: ["$$this.status", "completed"] }
                  }
                }
              }
            ]
          }
        }
      },
      {
        $sort: { totalAppointments: -1 }
      }
    ]);

    res.status(200).json(
      new ApiResponse(200, {
        availabilityStatus,
        specializationDistribution,
        doctorPerformance
      }, "Doctor analytics retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error fetching doctor analytics");
  }
});

const getComprehensiveAnalytics = asyncHandler(async (req, res) => {
  try {
    const [
      dashboardStats,
      appointmentAnalytics,
      patientAnalytics,
      revenueAnalytics,
      doctorAnalytics
    ] = await Promise.all([
      getDashboardStatsData(),
      getAppointmentAnalyticsData(),
      getPatientAnalyticsData(),
      getRevenueAnalyticsData(),
      getDoctorAnalyticsData()
    ]);

    res.status(200).json(
      new ApiResponse(200, {
        dashboard: dashboardStats,
        appointments: appointmentAnalytics,
        patients: patientAnalytics,
        revenue: revenueAnalytics,
        doctors: doctorAnalytics
      }, "Comprehensive analytics retrieved successfully")
    );
  } catch (error) {
    throw new ApiError(500, "Error fetching comprehensive analytics");
  }
});

const getDashboardStatsData = async () => {
  const totalPatients = await Patient.countDocuments();
  const totalDoctors = await User.countDocuments({ role: "doctor" });
  const totalAppointments = await Appointment.countDocuments();
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const todayAppointments = await Appointment.countDocuments({
    dateTime: { $gte: today, $lt: tomorrow }
  });

  const pendingAppointments = await Appointment.countDocuments({
    status: "pending"
  });

  const currentMonth = new Date();
  currentMonth.setDate(1);
  currentMonth.setHours(0, 0, 0, 0);
  
  const monthlyRevenue = await Patient.aggregate([
    { $unwind: "$visits" },
    {
      $match: {
        "visits.visitDate": { $gte: currentMonth },
        "visits.paymentStatus": "paid"
      }
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: "$visits.amount" }
      }
    }
  ]);

  const newPatientsThisMonth = await Patient.countDocuments({
    createdAt: { $gte: currentMonth }
  });

  return {
    totalPatients,
    totalDoctors,
    totalAppointments,
    todayAppointments,
    pendingAppointments,
    monthlyRevenue: monthlyRevenue[0]?.totalRevenue || 0,
    newPatientsThisMonth
  };
};

const getAppointmentAnalyticsData = async () => {
    const statusDistribution = await Appointment.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyTrends = await Appointment.aggregate([
      {
        $match: {
          dateTime: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$dateTime" },
            month: { $month: "$dateTime" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());
    weekStart.setHours(0, 0, 0, 0);

    const weeklyAppointments = await Appointment.aggregate([
      {
        $match: {
          dateTime: { $gte: weekStart }
        }
      },
      {
        $group: {
          _id: {
            dayOfWeek: { $dayOfWeek: "$dateTime" },
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$dateTime"
              }
            }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.dayOfWeek": 1 }
      }
    ]);

    const topDoctors = await Appointment.aggregate([
      {
        $group: {
          _id: "$doctor",
          appointmentCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "doctorInfo"
        }
      },
      {
        $unwind: "$doctorInfo"
      },
      {
        $project: {
          doctorName: "$doctorInfo.name",
          specialization: "$doctorInfo.specialization",
          appointmentCount: 1
        }
      },
      {
        $sort: { appointmentCount: -1 }
      },
      {
        $limit: 10
      }
    ]);

    return {
        statusDistribution,
        monthlyTrends,
        weeklyAppointments,
        topDoctors
      }
};

const getPatientAnalyticsData = async () => {
    const ageDistribution = await Patient.aggregate([
      {
        $match: { age: { $exists: true, $ne: null } }
      },
      {
        $bucket: {
          groupBy: "$age",
          boundaries: [0, 18, 30, 45, 60, 100],
          default: "Unknown",
          output: {
            count: { $sum: 1 }
          }
        }
      }
    ]);

    const genderDistribution = await Patient.aggregate([
      {
        $group: {
          _id: "$gender",
          count: { $sum: 1 }
        }
      }
    ]);

    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const registrationTrends = await Patient.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const topPatients = await Patient.find()
      .sort({ totalVisits: -1 })
      .limit(10)
      .select('name totalVisits totalRevenue lastVisit');

    const visitTypeDistribution = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $group: {
          _id: "$visits.visitType",
          count: { $sum: 1 }
        }
      }
    ]);

    return {
        ageDistribution,
        genderDistribution,
        registrationTrends,
        topPatients,
        visitTypeDistribution
    } 
};

const getRevenueAnalyticsData = async () => {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const monthlyRevenue = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $match: {
          "visits.visitDate": { $gte: twelveMonthsAgo },
          "visits.paymentStatus": "paid"
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$visits.visitDate" },
            month: { $month: "$visits.visitDate" }
          },
          revenue: { $sum: "$visits.amount" },
          visitCount: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);

    const revenueByVisitType = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $match: {
          "visits.paymentStatus": "paid"
        }
      },
      {
        $group: {
          _id: "$visits.visitType",
          revenue: { $sum: "$visits.amount" },
          count: { $sum: 1 }
        }
      }
    ]);

    const paymentStatusDistribution = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $group: {
          _id: "$visits.paymentStatus",
          count: { $sum: 1 },
          totalAmount: { $sum: "$visits.amount" }
        }
      }
    ]);

    const topRevenuePatients = await Patient.find()
      .sort({ totalRevenue: -1 })
      .limit(10)
      .select('name totalRevenue totalVisits');

    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const dailyRevenue = await Patient.aggregate([
      {
        $unwind: "$visits"
      },
      {
        $match: {
          "visits.visitDate": { $gte: currentMonth },
          "visits.paymentStatus": "paid"
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$visits.visitDate"
            }
          },
          revenue: { $sum: "$visits.amount" },
          visitCount: { $sum: 1 }
        }
      },
      {
        $sort: { "_id": 1 }
      }
    ]);

    return {
        monthlyRevenue,
        revenueByVisitType,
        paymentStatusDistribution,
        topRevenuePatients,
        dailyRevenue
    }
};

const getDoctorAnalyticsData = async () => {
    const availabilityStatus = await User.aggregate([
      {
        $match: { role: "doctor" }
      },
      {
        $group: {
          _id: "$available",
          count: { $sum: 1 }
        }
      }
    ]);

    const specializationDistribution = await User.aggregate([
      {
        $match: { 
          role: "doctor",
          specialization: { $exists: true, $ne: null, $ne: "" }
        }
      },
      {
        $group: {
          _id: "$specialization",
          count: { $sum: 1 }
        }
      }
    ]);

    const doctorPerformance = await User.aggregate([
      {
        $match: { role: "doctor" }
      },
      {
        $lookup: {
          from: "appointments",
          localField: "_id",
          foreignField: "doctor",
          as: "appointments"
        }
      },
      {
        $project: {
          name: 1,
          specialization: 1,
          consultationFee: 1,
          available: 1,
          totalAppointments: { $size: "$appointments" },
          completedAppointments: {
            $size: {
              $filter: {
                input: "$appointments",
                cond: { $eq: ["$$this.status", "completed"] }
              }
            }
          },
          potentialRevenue: {
            $multiply: [
              "$consultationFee",
              {
                $size: {
                  $filter: {
                    input: "$appointments",
                    cond: { $eq: ["$$this.status", "completed"] }
                  }
                }
              }
            ]
          }
        }
      },
      {
        $sort: { totalAppointments: -1 }
      }
    ]);

    return {
        availabilityStatus,
        specializationDistribution,
        doctorPerformance
    }
};

export {
  getDashboardStats,
  getAppointmentAnalytics,
  getPatientAnalytics,
  getRevenueAnalytics,
  getDoctorAnalytics,
  getComprehensiveAnalytics
};