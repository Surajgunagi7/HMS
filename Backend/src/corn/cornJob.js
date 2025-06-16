import cron from 'node-cron';
import Appointment from '../models/appointment.model.js';
import Patient from '../models/patient.model.js';
import {User} from '../models/user.model.js';
import {sendMail} from '../utils/sendMail.js'; 

cron.schedule('0 * * * *', async () => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  try {
    const upcomingAppointments = await Appointment.find({
      dateTime: { $gte: now, $lt: oneHourLater },
      status: 'pending',
    });

    for (const appointment of upcomingAppointments) {
      const patient = await Patient.findById(appointment.patient);
      const doctor = await User.findById(appointment.doctor);

      if (patient?.email && doctor?.name) {
        await sendMail({
          to: patient.email,
          subject: 'Appointment Reminder',
          html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
              <h3>Appointment Reminder</h3>
              <p>Dear ${patient.name},</p>
              <p>This is a friendly reminder that you have an appointment with <strong>Dr. ${doctor.name}</strong>.</p>
              <p><strong>Date & Time:</strong> ${new Date(appointment.dateTime).toLocaleString()}</p>
              <p>Please make sure to be on time.</p>
              <br/>
              <p>Regards,<br/>Hospital Administration</p>
            </div>
          `
        });
      }
    }

    console.log(`[Cron] Sent reminders for ${upcomingAppointments.length} appointment(s)`);
  } catch (err) {
    console.error('[Cron] Error in appointment reminder job:', err);
  }
});
