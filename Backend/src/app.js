import express from 'express'
import cors from 'cors'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json({
    limit: "10mb"
}))
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}))
app.use(express.static("public"))



app.get("/", (req, res) => {
    res.send("Hospital Management System Backend");
});

import userRouter from './routes/user.route.js'
import patientRouter from './routes/patient.route.js'
import appointmentRouter from './routes/appointment.route.js'
import callRequestRouter from './routes/callRequest.route.js'
import analyticRouter from './routes/analytic.route.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/patients", patientRouter)
app.use("/api/v1/appointments", appointmentRouter)
app.use("/api/v1/call-requests", callRequestRouter)
app.use("/api/v1/analytics", analyticRouter)
export { app }
