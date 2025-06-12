import cron from 'node-cron';
import Appointment from '../models/appointment.model.js';
import nodemailer from 'nodemailer';

// Reminder for appointments 1 hour before
cron.schedule('0 * * * *', async () => {
  const upcomingAppointments = await Appointment.find({
    dateTime: { $gte: new Date(), $lt: new Date(new Date().getTime() + 1 * 60 * 60 * 1000) },
    status: 'pending',
  });

  upcomingAppointments.forEach(async (appointment) => {
    const patient = await Patient.findById(appointment.patient);
    const doctor = await User.findById(appointment.doctor);
    await sendAppointmentReminderEmail(patient.email, doctor.name, appointment.dateTime);
  });
});

const sendAppointmentReminderEmail = async (patientEmail, doctorName, appointmentTime) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });
  
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: patientEmail,
      subject: 'Appointment Reminder',
      text: `This is a reminder for your appointment with Dr. ${doctorName} scheduled for ${appointmentTime}.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error('Error sending reminder email:', err);
    }
};